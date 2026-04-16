/**
 * @typedef {'IMP' | 'IR' | 'ICCB' | 'MIXED'} Category
 *
 * @typedef {{ id: 'A'|'B'|'C'|'D', text: string }} Choice
 *
 * @typedef {{ id: number, name: string, relevance: string }} Principle
 *
 * @typedef {{ term: string, role: string }} Anatomy
 *
 * @typedef {{
 *   explanation: string,
 *   principles: Principle[],
 *   anatomy: Anatomy[]
 * }} Rationale
 *
 * @typedef {{
 *   id: string,
 *   category: 'IMP' | 'IR' | 'ICCB',
 *   scenario: string,
 *   choices: Choice[],
 *   correctId: 'A'|'B'|'C'|'D',
 *   rationale: Rationale
 * }} QuizQuestion
 */
