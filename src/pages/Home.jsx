import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaLeaf,
  FaBrain,
  FaChartLine,
  FaUpload,
  FaArrowRight,
  FaSeedling,
  FaShieldAlt,
  FaMicroscope,
} from "react-icons/fa";
import "./Home.css";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

function Home() {
  const features = [
    {
      icon: <FaBrain />,
      title: "EfficientNetB0",
      desc: "Arsitektur CNN yang efisien dan akurat untuk klasifikasi gambar dengan parameter yang optimal.",
      color: "var(--green-500)",
    },
    {
      icon: <FaMicroscope />,
      title: "CBAM Attention",
      desc: "Convolutional Block Attention Module untuk meningkatkan fokus model pada fitur penting.",
      color: "var(--emerald-500)",
    },
    {
      icon: <FaChartLine />,
      title: "Oversampling",
      desc: "Teknik penyeimbangan data untuk meningkatkan performa pada kelas dengan sampel minoritas.",
      color: "var(--green-600)",
    },
    {
      icon: <FaShieldAlt />,
      title: "5 Kelas Penyakit",
      desc: "Mampu mendeteksi 4 jenis penyakit daun singkong dan kondisi daun sehat.",
      color: "var(--green-700)",
    },
  ];

  const steps = [
    {
      num: "01",
      icon: <FaUpload />,
      title: "Upload Gambar",
      desc: "Ambil foto daun singkong atau upload dari galeri",
    },
    {
      num: "02",
      icon: <FaBrain />,
      title: "Analisis AI",
      desc: "Model EfficientNetB0+CBAM menganalisis gambar",
    },
    {
      num: "03",
      icon: <FaLeaf />,
      title: "Hasil Klasifikasi",
      desc: "Dapatkan hasil diagnosis dan rekomendasi penanganan",
    },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" id="hero-section">
        <div className="hero-bg">
          <div className="hero-bg-pattern" />
          <div className="hero-bg-glow" />
        </div>
        <div className="container hero-content">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="hero-text"
          >
            <motion.div variants={fadeUp} className="hero-badge">
              <FaSeedling />
              <span>Machine Learning untuk Pertanian</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="hero-title">
              Klasifikasi Penyakit
              <br />
              <span className="hero-title-highlight">Daun Singkong</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="hero-desc">
              Menggunakan <strong>EfficientNetB0</strong> dengan{" "}
              <strong>Convolutional Block Attention Module (CBAM)</strong> dan{" "}
              <strong>Oversampling</strong> untuk mendeteksi penyakit daun
              singkong secara akurat dan cepat.
            </motion.p>
            <motion.div variants={fadeUp} className="hero-actions">
              <Link to="/predict" className="btn btn-white" id="hero-predict-btn">
                <FaUpload />
                Mulai Prediksi
                <FaArrowRight />
              </Link>
              <Link to="/machinelearning" className="btn btn-outline-hero" id="hero-ml-btn">
                Pelajari Metode
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hero-visual"
          >
            <div className="hero-card-stack">
              <div className="hero-floating-card hfc-1">
                <FaLeaf className="hfc-icon" />
                <span>CBB</span>
              </div>
              <div className="hero-floating-card hfc-2">
                <FaLeaf className="hfc-icon" />
                <span>CMD</span>
              </div>
              <div className="hero-floating-card hfc-3">
                <FaLeaf className="hfc-icon" />
                <span>Healthy</span>
              </div>
              <div className="hero-main-visual">
                <div className="hero-leaf-emoji">🍃</div>
                <div className="hero-visual-ring" />
                <div className="hero-visual-ring ring-2" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="hero-wave">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 80L60 73.3C120 66.7 240 53.3 360 48C480 42.7 600 45.3 720 53.3C840 61.3 960 74.7 1080 77.3C1200 80 1320 72 1380 68L1440 64V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V80Z"
              fill="#f0fdf4"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" id="features-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="features-header"
          >
            <motion.p variants={fadeUp} className="section-label">
              Teknologi
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-title">
              Metode yang Digunakan
            </motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle">
              Kombinasi arsitektur deep learning terkini untuk hasil klasifikasi
              yang optimal
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="features-grid"
          >
            {features.map((f, i) => (
              <motion.div key={i} variants={fadeUp} className="feature-card">
                <div
                  className="feature-icon"
                  style={{ background: `${f.color}15`, color: f.color }}
                >
                  {f.icon}
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section steps-section" id="steps-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="features-header"
          >
            <motion.p variants={fadeUp} className="section-label">
              Cara Kerja
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-title">
              Tiga Langkah Mudah
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="steps-grid"
          >
            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeUp} className="step-card">
                <div className="step-number">{step.num}</div>
                <div className="step-icon">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="steps-cta"
          >
            <Link to="/predict" className="btn btn-primary" id="steps-predict-btn">
              <FaUpload />
              Coba Sekarang
              <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;
