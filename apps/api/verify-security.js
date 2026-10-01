#!/usr/bin/env node

/**
 * Quick Security Verification Script
 * 
 * Checks that all security components are properly configured
 * Run before deployment to catch issues early
 */

const fs = require('fs');
const path = require('path');

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

function checkFile(filePath, description) {
  const fullPath = path.join(__dirname, filePath);
  const exists = fs.existsSync(fullPath);
  
  if (exists) {
    log(`✅ ${description}`, 'green');
    return true;
  } else {
    log(`❌ ${description} - File not found: ${filePath}`, 'red');
    return false;
  }
}

function checkEnvVariable(varName, required = true) {
  const envPath = path.join(__dirname, '.env');
  
  if (!fs.existsSync(envPath)) {
    if (required) {
      log(`❌ .env file not found`, 'red');
    } else {
      log(`⚠️  .env file not found (optional for production)`, 'yellow');
    }
    return false;
  }
  
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const hasVar = envContent.includes(`${varName}=`);
  const isCommented = envContent.includes(`#${varName}=`);
  
  if (hasVar && !isCommented) {
    const match = envContent.match(new RegExp(`${varName}=(.+)`));
    const value = match ? match[1].trim() : '';
    
    if (value && value !== 'your-token-here' && value !== 'https://your-redis.upstash.io') {
      log(`✅ ${varName} configured`, 'green');
      return true;
    } else {
      log(`⚠️  ${varName} is set but value looks like placeholder`, 'yellow');
      return false;
    }
  } else {
    if (required) {
      log(`❌ ${varName} not configured in .env`, 'red');
    } else {
      log(`⚠️  ${varName} not configured (optional)`, 'yellow');
    }
    return false;
  }
}

function checkPackageJson() {
  const packagePath = path.join(__dirname, 'package.json');
  
  if (!fs.existsSync(packagePath)) {
    log('❌ package.json not found', 'red');
    return false;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  const requiredDeps = ['@upstash/redis'];
  let allPresent = true;
  
  for (const dep of requiredDeps) {
    if (deps[dep]) {
      log(`✅ ${dep} installed (${deps[dep]})`, 'green');
    } else {
      log(`❌ ${dep} not installed`, 'red');
      allPresent = false;
    }
  }
  
  return allPresent;
}

async function main() {
  console.log('\n');
  log('╔═══════════════════════════════════════════════════════╗', 'cyan');
  log('║  OKURMEN Security Verification                        ║', 'cyan');
  log('╚═══════════════════════════════════════════════════════╝', 'cyan');
  console.log('\n');

  let errors = 0;
  let warnings = 0;

  // Check file structure
  log('📁 Checking file structure...', 'blue');
  console.log('');
  
  const files = [
    ['src/middleware.ts', 'Middleware integration'],
    ['src/lib/rate-limit/index.ts', 'Rate limiter'],
    ['src/lib/rate-limit/config.ts', 'Rate limit config'],
    ['src/lib/rate-limit/upstash-client.ts', 'Upstash client'],
    ['src/lib/rate-limit/ip-utils.ts', 'IP utilities'],
    ['src/lib/rate-limit/types.ts', 'Rate limit types'],
    ['src/lib/middleware/security-headers.ts', 'Security headers'],
    ['src/lib/middleware/request-size.ts', 'Request size limiter'],
    ['src/lib/logging/logger.ts', 'Logger'],
    ['src/lib/logging/security-events.ts', 'Security event tracker'],
    ['src/lib/validation/pagination.ts', 'Pagination validator'],
    ['src/app/api/health/route.ts', 'Health check endpoint'],
    ['.env.example', 'Environment example'],
  ];

  for (const [file, desc] of files) {
    if (!checkFile(file, desc)) {
      errors++;
    }
  }

  console.log('');
  
  // Check dependencies
  log('📦 Checking dependencies...', 'blue');
  console.log('');
  
  if (!checkPackageJson()) {
    errors++;
  }

  console.log('');

  // Check environment variables
  log('🔐 Checking environment variables...', 'blue');
  console.log('');

  const envVars = [
    ['UPSTASH_REDIS_REST_URL', true],
    ['UPSTASH_REDIS_REST_TOKEN', true],
    ['ENABLE_RATE_LIMIT', false],
    ['DATABASE_URL', true],
    ['JWT_SECRET', true],
    ['NEXTAUTH_SECRET', true],
  ];

  for (const [varName, required] of envVars) {
    const result = checkEnvVariable(varName, required);
    if (!result && required) {
      errors++;
    } else if (!result && !required) {
      warnings++;
    }
  }

  console.log('');

  // Summary
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  
  if (errors === 0 && warnings === 0) {
    log('✅ All checks passed! Ready for deployment.', 'green');
  } else if (errors === 0 && warnings > 0) {
    log(`⚠️  ${warnings} warning(s) found. Review before deployment.`, 'yellow');
  } else {
    log(`❌ ${errors} error(s) and ${warnings} warning(s) found.`, 'red');
    log('Please fix errors before deployment.', 'red');
  }
  
  console.log('');

  // Next steps
  if (errors > 0) {
    log('📋 Next steps:', 'blue');
    console.log('');
    log('1. Install missing dependencies:', 'cyan');
    log('   pnpm install', 'reset');
    console.log('');
    log('2. Configure environment variables:', 'cyan');
    log('   cp .env.example .env', 'reset');
    log('   nano .env', 'reset');
    console.log('');
    log('3. Get Upstash credentials:', 'cyan');
    log('   https://console.upstash.com/', 'reset');
    console.log('');
    log('4. Run this script again:', 'cyan');
    log('   node verify-security.js', 'reset');
    console.log('');
  } else if (warnings > 0) {
    log('📋 Warnings to address:', 'blue');
    console.log('');
    log('- Review optional environment variables', 'yellow');
    log('- Ensure production credentials are set in Railway', 'yellow');
    console.log('');
  } else {
    log('📋 Ready to deploy:', 'blue');
    console.log('');
    log('1. Test locally:', 'cyan');
    log('   pnpm dev', 'reset');
    log('   node test-security-complete.js', 'reset');
    console.log('');
    log('2. Deploy to Railway:', 'cyan');
    log('   railway variables set UPSTASH_REDIS_REST_URL="..."', 'reset');
    log('   railway variables set UPSTASH_REDIS_REST_TOKEN="..."', 'reset');
    log('   git push origin main', 'reset');
    console.log('');
    log('3. Verify production:', 'cyan');
    log('   curl https://your-api.up.railway.app/api/health', 'reset');
    console.log('');
  }

  process.exit(errors > 0 ? 1 : 0);
}

main().catch(error => {
  log(`\n❌ Fatal error: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});
