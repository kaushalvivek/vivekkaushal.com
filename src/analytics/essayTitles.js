import essays from '../static/essays.json';

export const essayTitles = Object.fromEntries(essays.map((e) => [e.slug, e.title]));
