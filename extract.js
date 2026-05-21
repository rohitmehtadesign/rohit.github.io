import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

const refDir = '/Users/rohitmehta/projects/rohitmehtadesign';
const outputDir = '/Users/rohitmehta/projects/framer templates/RohitMehtaPortfolioDarkLime/src/data';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Map the HTML files to project IDs
const filesToIds = {
  'case-study-freshii.html': 'freshii',
  'case-study-oracle.html': 'oracle',
  'case-study-compass.html': 'compass',
  'case-study-flipp-loyalty.html': 'flipp-loyalty',
  'case-study-flipp-share.html': 'flipp-share',
  'case-study-flipp-browse.html': 'flipp-browse',
  'case-study-ola-pwa.html': 'ola-pwa',
  'case-study-ola-debit.html': 'ola-debit',
};

// Also read index.html to extract thumbnail images and gradients for the WorkGrid
const indexHtmlPath = path.join(refDir, 'index.html');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
const indexDom = new JSDOM(indexHtml);
const indexDoc = indexDom.window.document;

const projectsOverview = [];
const projectElements = indexDoc.querySelectorAll('.project');
const gradients = [
  'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)',
  'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
  'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
  'linear-gradient(to right, #fa709a 0%, #fee140 100%)',
  'linear-gradient(to top, #30cfd0 0%, #330867 100%)',
  'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%)'
];

projectElements.forEach((el, index) => {
  const linkEl = el.querySelector('.cs-link');
  if (!linkEl) return;
  const href = linkEl.getAttribute('href');
  const id = filesToIds[href] || `project-${index}`;
  const name = el.querySelector('.project-name')?.textContent || '';
  const typeStr = el.querySelector('.project-tags')?.textContent.replace(/\\s+/g, ' ').trim() || '';
  const metaSpan = el.querySelectorAll('.project-meta span');
  const year = metaSpan.length > 1 ? metaSpan[1].textContent : '';
  const img = el.querySelector('.project-img img')?.getAttribute('src');

  projectsOverview.push({
    id,
    name,
    type: typeStr.split(' ')[0] || 'Project',
    year,
    gradient: gradients[index % gradients.length],
    thumbnail: img ? `/${img}` : '' // Assuming we will copy images to public/images
  });
});

const caseStudies = {};

Object.entries(filesToIds).forEach(([filename, id]) => {
  const filePath = path.join(refDir, filename);
  if (!fs.existsSync(filePath)) return;

  const html = fs.readFileSync(filePath, 'utf8');
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const title = doc.querySelector('.cs-title')?.textContent || '';
  const metaElements = doc.querySelectorAll('.cs-meta');
  const meta = {};
  metaElements.forEach(el => {
    const key = el.querySelector('span')?.textContent?.trim().toLowerCase() || '';
    const val = el.textContent.replace(el.querySelector('span')?.textContent, '').trim();
    if (key) meta[key] = val;
  });

  const coverImg = doc.querySelector('.cs-hero-img img')?.getAttribute('src') || '';

  const statsElements = doc.querySelectorAll('.cs-stat');
  const stats = Array.from(statsElements).map(el => ({
    num: el.querySelector('.cs-num')?.textContent || '',
    label: el.querySelector('.cs-lbl')?.textContent || ''
  }));

  const sections = [];
  const sectionElements = doc.querySelectorAll('.cs-section');
  sectionElements.forEach(section => {
    const sectionTitle = section.querySelector('h2')?.textContent || '';
    const content = [];
    
    // Check if it has steps
    const steps = section.querySelectorAll('.cs-step');
    if (steps.length > 0) {
      const stepData = Array.from(steps).map(step => ({
        num: step.querySelector('.cs-step-num')?.textContent || '',
        title: step.querySelector('h3')?.textContent || '',
        text: step.querySelector('p')?.textContent || ''
      }));
      sections.push({ type: 'steps', title: sectionTitle, steps: stepData });
      return;
    }

    // Check for lists
    const ul = section.querySelector('ul');
    if (ul) {
      const items = Array.from(ul.querySelectorAll('li')).map(li => li.innerHTML);
      const paragraphs = Array.from(section.querySelectorAll('p')).map(p => p.innerHTML);
      sections.push({ type: 'list', title: sectionTitle, paragraphs, items });
      return;
    }

    // Standard text paragraphs
    const paragraphs = Array.from(section.querySelectorAll('p')).map(p => p.innerHTML);
    if (paragraphs.length > 0) {
      sections.push({ type: 'text', title: sectionTitle, paragraphs });
    }
  });

  caseStudies[id] = {
    id,
    title,
    meta,
    coverImg: coverImg ? `/${coverImg}` : '',
    stats,
    sections
  };
});

const outputData = `
// Generated via extract script
export const projectsOverview = ${JSON.stringify(projectsOverview, null, 2)};
export const caseStudies = ${JSON.stringify(caseStudies, null, 2)};
`;

fs.writeFileSync(path.join(outputDir, 'projects.js'), outputData);
console.log('Extraction complete. Saved to src/data/projects.js');
