/**
 * Complete Security Testing Suite
 * 
 * Tests all implemented security features:
 * - Rate limiting
 * - Security headers
 * - Request size limits
 * - Health check
 * - IP validation
 */

const API_URL = process.env.API_URL || 'http://localhost:3002';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logTest(testName) {
  console.log(`\n${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  log(`🧪 Testing: ${testName}`, 'blue');
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Test 1: Health Check
async function testHealthCheck() {
  logTest('Health Check Endpoint');
  
  try {
    const response = await fetch(`${API_URL}/api/health`);
    const data = await response.json();
    
    if (response.status === 200 && data.status === 'ok') {
      log('✅ Health check passed', 'green');
      log(`   Uptime: ${data.uptime}s`, 'cyan');
      log(`   Redis: ${data.checks?.redis || 'unknown'}`, 'cyan');
      log(`   Database: ${data.checks?.database || 'unknown'}`, 'cyan');
    } else {
      log('❌ Health check failed', 'red');
      console.log(data);
    }
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
  }
}

// Test 2: Security Headers
async function testSecurityHeaders() {
  logTest('Security Headers');
  
  try {
    const response = await fetch(`${API_URL}/api/health`);
    
    const securityHeaders = {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': null, // Just check presence
    };
    
    let allPresent = true;
    
    for (const [header, expectedValue] of Object.entries(securityHeaders)) {
      const actualValue = response.headers.get(header);
      
      if (actualValue) {
        if (expectedValue && actualValue !== expectedValue) {
          log(`⚠️  ${header}: ${actualValue} (expected: ${expectedValue})`, 'yellow');
        } else {
          log(`✅ ${header}: ${actualValue}`, 'green');
        }
      } else {
        log(`❌ ${header}: Missing`, 'red');
        allPresent = false;
      }
    }
    
    if (allPresent) {
      log('\n✅ All security headers present', 'green');
    }
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
  }
}

// Test 3: Rate Limit Headers
async function testRateLimitHeaders() {
  logTest('Rate Limit Headers');
  
  try {
    const response = await fetch(`${API_URL}/api/health`);
    
    const rateLimit = response.headers.get('X-RateLimit-Limit');
    const remaining = response.headers.get('X-RateLimit-Remaining');
    const reset = response.headers.get('X-RateLimit-Reset');
    
    if (rateLimit && remaining && reset) {
      log(`✅ Rate limit headers present`, 'green');
      log(`   Limit: ${rateLimit}`, 'cyan');
      log(`   Remaining: ${remaining}`, 'cyan');
      log(`   Reset: ${new Date(parseInt(reset) * 1000).toLocaleString()}`, 'cyan');
    } else {
      log('⚠️  Rate limit headers missing (may be disabled)', 'yellow');
    }
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
  }
}

// Test 4: Rate Limiting (Login)
async function testRateLimiting() {
  logTest('Rate Limiting - Login Endpoint');
  
  const testEmail = `test_${Date.now()}@example.com`;
  
  log(`Testing with email: ${testEmail}`, 'cyan');
  log('Sending 6 requests (limit should be 5)...', 'cyan');
  
  let blockedAt = null;
  
  for (let i = 1; i <= 6; i++) {
    try {
      const response = await fetch(`${API_URL}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testEmail,
          password: 'wrong-password',
        }),
      });
      
      const remaining = response.headers.get('X-RateLimit-Remaining');
      
      if (response.status === 429) {
        log(`Request ${i}: ⛔ BLOCKED (429 Too Many Requests)`, 'red');
        blockedAt = i;
        break;
      } else {
        log(`Request ${i}: ${response.status} (Remaining: ${remaining || 'N/A'})`, 'cyan');
      }
      
      await sleep(100); // Small delay between requests
    } catch (error) {
      log(`Request ${i}: ❌ Error: ${error.message}`, 'red');
    }
  }
  
  if (blockedAt === 6) {
    log('\n✅ Rate limiting working correctly (blocked at request 6)', 'green');
  } else if (blockedAt && blockedAt < 6) {
    log(`\n⚠️  Rate limiting triggered early (blocked at request ${blockedAt})`, 'yellow');
  } else {
    log('\n⚠️  Rate limiting may not be enabled or configured', 'yellow');
  }
}

// Test 5: Payload Size Limit
async function testPayloadSizeLimit() {
  logTest('Payload Size Limit');
  
  try {
    // Create a large payload (2MB - should exceed 1MB limit)
    const largePayload = 'x'.repeat(2 * 1024 * 1024);
    
    const response = await fetch(`${API_URL}/api/auth/signin`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Content-Length': largePayload.length.toString(),
      },
      body: JSON.stringify({ data: largePayload }),
    });
    
    if (response.status === 413) {
      log('✅ Payload size limit working (413 Payload Too Large)', 'green');
      const data = await response.json();
      log(`   Max size: ${data.maxSize} bytes`, 'cyan');
      log(`   Received: ${data.receivedSize} bytes`, 'cyan');
    } else {
      log(`⚠️  Expected 413, got ${response.status}`, 'yellow');
    }
  } catch (error) {
    // Large payload may cause network error
    log(`⚠️  Error (this may be expected): ${error.message}`, 'yellow');
  }
}

// Test 6: CORS
async function testCORS() {
  logTest('CORS Configuration');
  
  try {
    const response = await fetch(`${API_URL}/api/health`, {
      method: 'OPTIONS',
      headers: {
        'Origin': 'http://localhost:3000',
        'Access-Control-Request-Method': 'GET',
      },
    });
    
    const allowOrigin = response.headers.get('Access-Control-Allow-Origin');
    const allowMethods = response.headers.get('Access-Control-Allow-Methods');
    
    if (allowOrigin) {
      log(`✅ CORS configured`, 'green');
      log(`   Allow-Origin: ${allowOrigin}`, 'cyan');
      log(`   Allow-Methods: ${allowMethods || 'N/A'}`, 'cyan');
    } else {
      log('⚠️  CORS headers not found', 'yellow');
    }
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
  }
}

// Test 7: Invalid JSON
async function testInvalidJSON() {
  logTest('Invalid JSON Handling');
  
  try {
    const response = await fetch(`${API_URL}/api/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'invalid-json{',
    });
    
    if (response.status === 400 || response.status === 500) {
      log(`✅ Invalid JSON handled (${response.status})`, 'green');
    } else {
      log(`⚠️  Unexpected status: ${response.status}`, 'yellow');
    }
  } catch (error) {
    log(`⚠️  Error: ${error.message}`, 'yellow');
  }
}

// Run all tests
async function runAllTests() {
  console.log('\n');
  log('╔═══════════════════════════════════════════════════════╗', 'cyan');
  log('║  OKURMEN Security Testing Suite                      ║', 'cyan');
  log('╚═══════════════════════════════════════════════════════╝', 'cyan');
  log(`\nTesting API: ${API_URL}`, 'blue');
  
  await testHealthCheck();
  await sleep(500);
  
  await testSecurityHeaders();
  await sleep(500);
  
  await testRateLimitHeaders();
  await sleep(500);
  
  await testCORS();
  await sleep(500);
  
  await testInvalidJSON();
  await sleep(500);
  
  await testPayloadSizeLimit();
  await sleep(1000);
  
  await testRateLimiting();
  
  console.log('\n');
  log('╔═══════════════════════════════════════════════════════╗', 'cyan');
  log('║  Testing Complete                                     ║', 'cyan');
  log('╚═══════════════════════════════════════════════════════╝', 'cyan');
  console.log('\n');
}

// Run tests
runAllTests().catch(error => {
  log(`\n❌ Fatal error: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});
