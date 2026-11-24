import { useState } from 'react'
import { supabase } from './supabase'

export default function Admin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function login(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage('بيانات الدخول غير صحيحة')
    } else {
      setMessage('تم تسجيل الدخول بنجاح')
    }

    setLoading(false)
  }

  return (
    <main className="admin-login">
      <h1>لوحة إدارة أسرة القديس لوقا الطبيب</h1>
      <p>تسجيل دخول المسؤول</p>

      <form onSubmit={login}>
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
        </button>
      </form>

      {message && <p>{message}</p>}
    </main>
  )
}