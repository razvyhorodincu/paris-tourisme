// Remove this line to use the CSS font size (4rem):
// document.getElementsByTagName("h1")[0].style.fontSize = "6vw";

function showPage(pageId) {
            document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
            const target = document.getElementById(pageId);
            if (target) target.style.display = 'block';

            // Active tab color
            document.querySelectorAll('.nav-links a').forEach(a => {
                a.classList.toggle('active', a.getAttribute('data-page') === pageId);
            });

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Initial active tab
        window.onload = () => {
            document.querySelector('.nav-links a[data-page="home"]').classList.add('active');
        };

        // Modal zoom images
        document.addEventListener('click', function(e) {
            if (e.target.tagName === 'IMG' && e.target.closest('.gallery')) {
                const modal = document.createElement('div');
                modal.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;z-index:9999;cursor:zoom-out;`;
                const big = document.createElement('img');
                big.src = e.target.src; big.style.maxWidth = '90%'; big.style.maxHeight = '90%'; big.style.borderRadius = '15px';
                modal.appendChild(big);
                modal.onclick = () => modal.remove();
                document.body.appendChild(modal);
            }
        });

        document.addEventListener('DOMContentLoaded', () => {
            // Highlight current page in nav
            const currentPath = window.location.pathname.split('/').pop();
            document.querySelectorAll('.nav-links a').forEach(a => {
                const href = a.getAttribute('href');
                if (href === currentPath) {
                    a.classList.add('active');
                }
            });

            // Review form handler
            document.querySelectorAll('.review-form').forEach(form => {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const name = this.querySelector('.reviewer-name').value.trim();
                    const text = this.querySelector('.review-text').value.trim();
                    const rating = this.querySelector('input[type="radio"]:checked')?.value || 0;
                    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
                    
                    const newReview = document.createElement('div');
                    newReview.className = 'review';
                    newReview.innerHTML = `<blockquote>« ${text} »</blockquote><p>— ${name} ${stars}</p>`;
                    
                    this.parentElement.insertBefore(newReview, this);
                    this.reset();
                });
            });
        });