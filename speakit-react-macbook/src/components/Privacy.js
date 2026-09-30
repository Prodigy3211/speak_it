export default function Privacy (){
    const handleSupportForm = () => {
    // Replace this with your actual contact form URL or email fallback
    window.open ('https://forms.gle/EGr4DYCQR7px8QoG8 ', '_blank', 'noopener,noreferrer'); 
  };
    
    return(
 <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Privacy Policy</h1>
      </header>

      {/* Content Area */}
      <main style={styles.content}>
        <h2 style={styles.title}>Privacy Policy</h2>
        <p style={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</p>

        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>1. Information We Collect</h3>
          <p style={styles.text}>
            We collect information you provide directly to us, such as when you create an account, post content, or contact us for support.
          </p>
          
          <h4 style={styles.subsectionTitle}>Account Information</h4>
          <p style={styles.text}>
            When you create an account, we collect your email address and any other information you choose to provide.
          </p>

          <h4 style={styles.subsectionTitle}>Content You Post</h4>
          <p style={styles.text}>
            We collect the content you post, including text, images, and other materials you share through the app.
          </p>
        </section>

        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>2. How We Use Your Information</h3>
          <p style={styles.text}>
            We use the information we collect to provide, maintain, and improve our services, communicate with you, and ensure the security of our platform.
          </p>
        </section>

        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>3. Information Sharing</h3>
          <p style={styles.text}>
            We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
          </p>
        </section>

        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>4. Data Security</h3>
          <p style={styles.text}>
            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>5. Data Retention</h3>
          <p style={styles.text}>
            We retain your personal information for as long as necessary to provide our services and comply with legal obligations.
          </p>
        </section>

        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>6. Your Rights</h3>
          <p style={styles.text}>
            You have the right to access, update, or delete your personal information. You can also opt out of certain communications.
          </p>
        </section>

        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>7. Cookies and Tracking</h3>
          <p style={styles.text}>
            We may use cookies and similar tracking technologies to enhance your experience and collect usage information.
          </p>
        </section>

        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>8. Third-Party Services</h3>
          <p style={styles.text}>
            Our app may contain links to third-party services. We are not responsible for the privacy practices of these services.
          </p>
        </section>

        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>9. Children's Privacy</h3>
          <p style={styles.text}>
            Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13.
          </p>
        </section>

        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>10. Changes to This Policy</h3>
          <p style={styles.text}>
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
          </p>
        </section>

        <hr style={styles.divider} />

        <section style={styles.contactSection}>
          <h3 style={styles.contactTitle}>Contact Us</h3>
          <p style={styles.contactText}>
            If you have any questions about this Privacy Policy, please contact us through our:
          </p>
          <button onClick={handleSupportForm} style={styles.contactButton}>
            Contact Form
          </button>
        </section>
      </main>
    </div>
  );
}

// Inline CSS Styles mapping to your original mobile theme rules
const styles = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: '#333333',
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    maxWidth: '800px',
    padding: '20px',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: '20px',
    fontWeight: '600',
    margin: 0,
  },
  content: {
    width: '100%',
    maxWidth: '800px',
    padding: '30px 20px 60px 20px',
    boxSizing: 'border-box',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '8px',
    marginTop: 0,
  },
  lastUpdated: {
    fontSize: '14px',
    color: '#666666',
    marginBottom: '30px',
  },
  section: {
    marginBottom: '28px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#111111',
    marginBottom: '12px',
    marginTop: '24px',
  },
  subsectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#444444',
    marginBottom: '6px',
    marginTop: '16px',
  },
  text: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#4a4a4a',
    margin: '0 0 12px 0',
  },
  divider: {
    border: 0,
    borderTop: '1px solid #e0e0e0',
    margin: '40px 0',
  },
  contactSection: {
    backgroundColor: '#f9f9f9',
    padding: '24px',
    borderRadius: '8px',
    border: '1px solid #eeeeee',
  },
  contactTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginTop: 0,
    marginBottom: '8px',
  },
  contactText: {
    fontSize: '15px',
    lineHeight: '1.5',
    color: '#555555',
    marginBottom: '16px',
  },
  contactButton: {
    backgroundColor: '#007AFF',
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '15px',
    fontWeight: '500',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};