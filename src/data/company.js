// All copy below is taken verbatim from YASH-ELECTRICALS-and-SPA-SYSTEMS.pptx.
const phone = '9967181515'
const email = 'Jayant71@gmail.com'

export const company = {
  name: 'YASH Electricals & Spa Systems',
  nameLines: ['YASH ELECTRICALS', '& SPA SYSTEMS'],
  // Slide 1 bullet strip
  disciplines: [
    'Steam',
    'Sauna',
    'Jacuzzi',
    'Swimming Pool',
    'Chilled Shower',
    'Ice Bath',
    'Electrical Engineering',
  ],
  // Slide 2
  about: [
    'YASH Electricals & Spa Systems is a trusted provider of complete electrical contracting and luxury wellness solutions. We specialize in designing, installing, and maintaining premium spa and pool systems for residential, commercial, hospitality, and wellness projects.',
    'Our commitment is to deliver reliable workmanship, quality products, timely execution, and excellent customer satisfaction.',
  ],
  // Slide 16
  promise: [
    'At YASH Electricals & Spa Systems, we believe in delivering excellence through quality craftsmanship, innovative solutions, and long-term customer relationships.',
    'Every project is executed with precision, safety, and professionalism.',
  ],
  sectors: ['Residential', 'Commercial', 'Hospitality', 'Wellness'],

  phone,
  phoneDisplay: '99671 81515',
  email,
  address: 'Mahim, Mumbai – 400016',
  tel: `tel:+91${phone}`,
  whatsapp: `https://wa.me/91${phone}?text=${encodeURIComponent(
    'Hello YASH Electricals & Spa Systems, I would like to enquire about your services.',
  )}`,
  mailto: `mailto:${email}?subject=${encodeURIComponent('Enquiry — YASH Electricals & Spa Systems')}`,
}
