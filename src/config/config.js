export default {
  backendURL: 'http://localhost:3333',
  state: [
    { name: 'OPEN', action: 'OPEN' },
    { name: 'RESOLVED', action: 'resolve' },
    { name: 'BLOCKED', action: 'block' },
    { name: 'ALL' }
  ],
  reportType: ['ALL', 'SPAM', 'INFRINGES_PROPERTY', 'VIOLATES_POLICIES'],
  resourceType: ['ALL', 'ARTICLE', 'POST', 'REPLY']
}
