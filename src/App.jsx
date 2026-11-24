
import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import './App.css'
import Admin from './Admin'
import { Routes, Route, Link } from 'react-router-dom'
const sections = [
  {
    number: '01',
    title: 'العظات والدروس',
    description: 'كلمات روحية وتأملات من تعاليم الكنيسة وآبائها.',
link: '/sermons',  },
  {
    number: '02',
    title: 'الصور والأنشطة',
    description: 'ذكريات الخدمة والاجتماعات واللقاءات المباركة.',
link: '/activities',  },
  {
    number: '03',
    title: 'مواعيد الاجتماعات',
    description: 'تابع مواعيد لقاءات الأسرة واجتماعاتها.',
link: '/schedule',      },
  {
    number: '04',
    title: 'مستلزمات الكليات الطبية',
    description: 'كل ما يحتاجه طلاب الكليات الطبية من مستلزمات.',
    link: '/medical',
  },
]

function Home() {
 const [sermons, setSermons] = useState([])
const [loading, setLoading] = useState(true)

useEffect(() => {
  async function fetchSermons() {
    const { data, error } = await supabase
      .from('sermons')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error:', error)
    } else {
      setSermons(data || [])
    }

    setLoading(false)
  }

  fetchSermons()
}, [])

 return (
    <main dir="rtl">

      <div className="top-line" />

      <header className="navbar">
        <a href="#home" className="brand">
          <span className="brand-cross">✝</span>
          <span className="brand-text">
            <strong>أسرة القديس لوقا الطبيب  </strong>
            
          </span>
        </a>

       
      </header>

      <section className="hero" id="home">
        <div className="hero-background-mark">✝</div>

        <div className="hero-content">
          <div className="eyebrow">
            <span />
            بِاسْمِ الآبِ وَالابْنِ وَالرُّوحِ القُدُس
            <span />
          </div>

          <h1>
            أسرة القديس
            لوقا
               الطبيب
          </h1>

          <div className="gold-divider">
            <span />
            ✦
            <span />
          </div>

          <p>
            في المحبة نجتمع، وبالإيمان ننمو،
            وفي الخدمة نعيش رسالتنا.
          </p>

          <a href="#about" className="main-button">
            تعرف على الأسرة
            <span>←</span>
          </a>
        </div>

        <div className="hero-portrait">
          <div className="portrait-frame">
            <div className="portrait-inner">
              <img
                src="/saint-luke.png"
                alt="أيقونة القديس لوقا الطبيب"
              />
            </div>
          </div>
          <div className="portrait-caption">
            <span>✦</span>
            القديس لوقا الطبيب
            <span>✦</span>
          </div>
        </div>

        <div className="hero-side-note">أسرة القديس لوقا الطبيب</div>
      </section>

      <section className="welcome" id="about">
        <div className="welcome-heading">
          <span className="section-kicker">كلمة الأسرة</span>
          <h2>معًا في الإيمان .. نحو حياة أفضل</h2>
          <div className="gold-divider">
            <span />
            ✦
            <span />
          </div>
        </div>

        <p>
          نلتقي بروح المحبة، ونسعى للنمو في الإيمان والمعرفة،
          ونخدم بمحبة صادقة، لتكون أسرتنا مساحة تجمع القلوب
          على الصلاة والتعلم والشركة الروحية.
        </p>
      </section>

      <section className="library">
        <div className="library-heading">
          <div>
            <span className="section-kicker">أقسام الأسرة</span>
            <h2>مساحات للنمو والشركة</h2>
          </div>
          <span className="heading-cross">✝</span>
        </div>

        <div className="section-list">
          {sections.map((section) => (
            <a
              href={section.link}
              className="section-row"
              id={section.number === '01' ? 'sermons' : section.number === '02' ? 'activities' : 'schedule'}
              key={section.number}
            >
              <span className="row-number">{section.number}</span>
              <div className="row-details">
                <h3>{section.title}</h3>
                <p>{section.description}</p>
              </div>
              <span className="row-arrow">←</span>
            </a>
          ))}
        </div>
      
<div className="sermons-live">
  {sermons.length > 0 && (
    <div className="sermons-grid">
      {sermons.map((sermon) => (
        <article className="sermon-card" key={sermon.id}>
          {sermon.image_url && (
            <img src={sermon.image_url} alt={sermon.title} />
          )}
          <h3>{sermon.title}</h3>
          <p>{sermon.description}</p>
        </article>
      ))}
    </div>
  )}
</div>
</section>

      <section className="closing-quote">
        <span className="quote-mark">“</span>
        <h2>المحبة لا تسقط أبدًا</h2>
        
        <span className="quote-reference">١ كورنثوس ١٣ : ٨</span>
      </section>

      <footer id="contact">
        <div className="footer-cross">✝</div>
        <h2>أسرة القديس لوقا الطبيب</h2>
        <p>خدمة • إيمان • محبة</p>
        <div className="footer-line" />
        <small>جميع الحقوق محفوظة © 2026
          
        </small>
        <p>developed by k.salep</p>
      </footer>

    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/sermons" element={<h1>العظات والدروس</h1>} />
      <Route path="/activities" element={<h1>الصور والأنشطة</h1>} />
      <Route path="/schedule" element={<h1>مواعيد الاجتماعات</h1>} />
      <Route path="/medical" element={<h1>مستلزمات الكليات الطبية</h1>} />
    </Routes>
  )
}

export default App
