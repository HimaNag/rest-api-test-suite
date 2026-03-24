# rest-api-test-suite

![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![CI](https://github.com/HimaNag/rest-api-test-suite/actions/workflows/api-tests.yml/badge.svg)

A production-grade REST API test automation framework built with **Playwright** and **TypeScript**, targeting the [JSONPlaceholder](https://jsonplaceholder.typicode.com) API.

---

## 🏗️ Framework Architecture
```
rest-api-test-suite/
├── src/
│   ├── clients/
│   │   └── ApiClient.ts        # Reusable HTTP client wrapper
│   ├── types/
│   │   └── user.types.ts       # TypeScript interfaces for API contracts
│   └── utils/
│       └── schemaValidator.ts  # Response schema validation utility
├── tests/
│   ├── users/
│   │   └── users.spec.ts       # Users API — full CRUD coverage
│   └── posts/
│       └── posts.spec.ts       # Posts API — full CRUD + filter coverage
├── playwright.config.ts
└── tsconfig.json
```

---

## ✅ Test Coverage

| Resource | Method | Scenario | Status |
|----------|--------|----------|--------|
| Users | GET | List all users | ✅ |
| Users | GET | Single user by ID | ✅ |
| Users | GET | Non-existent user (404) | ✅ |
| Users | POST | Create new user | ✅ |
| Users | PUT | Update existing user | ✅ |
| Users | DELETE | Delete user | ✅ |
| Posts | GET | List all posts | ✅ |
| Posts | GET | Single post by ID | ✅ |
| Posts | GET | Non-existent post (404) | ✅ |
| Posts | GET | Filter posts by userId | ✅ |
| Posts | POST | Create new post | ✅ |
| Posts | PUT | Update existing post | ✅ |
| Posts | DELETE | Delete post | ✅ |

**13 tests — 13 passing in ~2.2s**

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm

### Installation
```bash
git clone https://github.com/HimaNag/rest-api-test-suite.git
cd rest-api-test-suite
npm install
```

### Run All Tests
```bash
npx playwright test
```

### Run Specific Suite
```bash
npx playwright test tests/users/users.spec.ts
npx playwright test tests/posts/posts.spec.ts
```

### Run with HTML Report
```bash
npx playwright test --reporter=html
npx playwright show-report
```

---

## 🧩 Key Design Decisions

**ApiClient wrapper** — All HTTP methods are encapsulated in a single reusable class. Tests never call Playwright's request object directly, making the framework easy to maintain and extend.

**Schema validation** — Every response is validated for required fields before asserting values. This catches contract breaks early even when status codes are correct.

**TypeScript interfaces** — All request payloads and response shapes are typed, providing compile-time safety and better IDE support.

---

## 🛠️ Tech Stack

- [Playwright](https://playwright.dev/) — API testing
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [JSONPlaceholder](https://jsonplaceholder.typicode.com) — Public REST API

