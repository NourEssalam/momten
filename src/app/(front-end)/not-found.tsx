// Shown for URLs outside any language. It renders its own <html>, and the site's
// stylesheet isn't loaded here, so everything is styled inline and the text is
// shown in all three languages.
export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
          background: '#ffffff',
          color: '#2e244c',
        }}
      >
        <main
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          <div>
            <p style={{ fontSize: '6rem', fontWeight: 800, lineHeight: 1, margin: 0, color: '#9675fa' }}>
              404
            </p>
            <h1 style={{ fontSize: '1.75rem', margin: '1.5rem 0 0.5rem' }}>Page not found</h1>
            <p style={{ margin: '0.25rem 0', color: '#555' }}>Page introuvable</p>
            <p dir="rtl" style={{ margin: '0.25rem 0', color: '#555' }}>
              الصفحة غير موجودة
            </p>
            <a
              href="/"
              style={{
                display: 'inline-block',
                marginTop: '2rem',
                padding: '0.75rem 1.75rem',
                borderRadius: '0.5rem',
                background: '#9675fa',
                color: '#ffffff',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Home · Accueil · الرئيسية
            </a>
          </div>
        </main>
      </body>
    </html>
  )
}
