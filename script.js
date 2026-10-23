const progress = document.querySelector('.scroll-progress');
const header = document.querySelector('.header');

function onScroll(){
  const max = document.documentElement.scrollHeight - innerHeight;
  const pct = max > 0 ? (scrollY / max) * 100 : 0;
  progress.style.width = pct + '%';
  header.classList.toggle('scrolled', scrollY > 30);
}
addEventListener('scroll', onScroll, {passive:true});
onScroll();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:0.10, rootMargin:'0px 0px -45px 0px'});

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = Math.min((i % 4) * 75, 225) + 'ms';
  observer.observe(el);
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const target = document.querySelector(id);
    if(!target) return;
    e.preventDefault();
    target.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

const media = matchMedia('(prefers-reduced-motion: reduce)');
if(!media.matches){
  const heroBg = document.querySelector('.hero-bg');
  addEventListener('scroll', () => {
    if(scrollY < innerHeight * 1.4){
      heroBg.style.transform = `scale(1.04) translateY(${scrollY * 0.065}px)`;
    }
  }, {passive:true});
}