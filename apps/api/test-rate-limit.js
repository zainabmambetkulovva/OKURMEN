/**
 * Rate Limiting Test Script
 * 
 * Tests:
 * 1. Normal requests (should pass)
 * 2. Excessive requests (should get 429)
 * 3. Wait and retry (should pass again)
 * 
 * Usage:
 *   node test-rate-limit.js
 */

const API_URL = process.env.API_URL || 'http://localhost:3002';

async function testRateLimit() {
  console.log('🧪 Testing Rate Limiting...\n');
  console.log(`API URL: ${API_URL}\n`);

  // Test 1: Health check (no rate limit)
  console.log('Test 1: Health Check (no rate limit)');
  try {
    const response = await fetch(`${API_URL}/api/health`);
    const data = await response.json();
    console.log('✓ Status:', response.status);
    console.log('✓ Response:', data);
    console.log('✓ Rate Limit Headers:');
    console.log('  X-RateLimit-Limit:', response.headers.get('x-ratelimit-limit'));
    console.log('  X-RateLimit-Remaining:', response.headers.get('x-ratelimit-remaining'));
    console.log('');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  // Test 2: Login endpoint - normal requests
  console.log('\nTest 2: Login Endpoint - Normal Requests (5 attempts)');
  for (let i = 1; i <= 5; i++) {
    try {
      const response = await fetch(`${API_URL}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'wrongpassword',
        }),
      });

      const data = await response.json();
      const remaining = response.headers.get('x-ratelimit-remaining');
      const limit = response.headers.get('x-ratelimit-limit');

      console.log(`  Request ${i}/${limit}: Status ${response.status}, Remaining: ${remaining}`);
      
      if (response.status === 429) {
        console.log('  ⚠️  Rate limit reached!');
        break;
      }
    } catch (error) {
      console.error(`  ❌ Request ${i} error:`, error.message);
    }

    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Test 3: Exceed rate limit
  console.log('\nTest 3: Exceed Rate Limit (attempt 6)');
  try {
    const response = await fetch(`${API_URL}/api/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'wrongpassword',
      }),
    });

    const data = await response.json();
    
    if (response.status === 429) {
      console.log('✓ Rate limit working! Got 429 status');
      console.log('✓ Response:', data);
      console.log('✓ Retry-After:', response.headers.get('retry-after'), 'seconds');
    } else {
      console.log('❌ Expected 429, got:', response.status);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  // Test 4: Public API endpoint
  console.log('\nTest 4: Public API Endpoint (courses)');
  try {
    const response = await fetch(`${API_URL}/api/courses`);
    const data = await response.json();
    
    console.log('✓ Status:', response.status);
    console.log('✓ Rate Limit Headers:');
    console.log('  Limit:', response.headers.get('x-ratelimit-limit'));
    console.log('  Remaining:', response.headers.get('x-ratelimit-remaining'));
    console.log('  Reset:', new Date(parseInt(response.headers.get('x-ratelimit-reset'))).toISOString());
  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  console.log('\n✅ Tests completed!');
  console.log('\nNote: Wait 15 minutes for rate limit to reset, or restart Redis.');
}

// Run tests
testRateLimit().catch(console.error);
