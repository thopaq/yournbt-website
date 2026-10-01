const form=document.querySelector('.contact-form');
if(form&&location.hostname.endsWith('.chatgpt.site'))form.addEventListener('submit',event=>{event.preventDefault();document.querySelector('#form-status').textContent='This preview does not send messages. Please email Admin@YourNBT.com. The contact form is configured for Netlify.';});
