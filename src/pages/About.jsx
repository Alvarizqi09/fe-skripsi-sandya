import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaLeaf,
  FaShieldAlt,
  FaArrowRight,
  FaSeedling,
  FaExclamationTriangle,
} from "react-icons/fa";
import "./About.css";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const diseases = [
  {
    id: "cbb",
    title: "Cassava Bacterial Blight (CBB)",
    shortName: "CBB",
    type: "Bakteri",
    risk: "Tinggi",
    riskColor: "danger",
    description:
      "Penyakit hawar bakteri yang disebabkan oleh Xanthomonas axonopodis pv. manihotis. Menyebabkan bercak angular coklat kehitaman pada daun.",
    characteristic: "Menyebar Cepat di Musim Hujan",
    icon: "🦠",
  },
  {
    id: "cbsd",
    title: "Cassava Brown Streak Disease (CBSD)",
    shortName: "CBSD",
    type: "Virus",
    risk: "Tinggi",
    riskColor: "danger",
    description:
      "Penyakit coklat bergaris yang disebabkan virus CBSV. Menyebabkan nekrosis pada umbi sehingga menurunkan kualitas panen.",
    characteristic: "Merusak Umbi & Daun",
    icon: "🔬",
  },
  {
    id: "cgm",
    title: "Cassava Green Mottle (CGM)",
    shortName: "CGM",
    type: "Virus",
    risk: "Sedang",
    riskColor: "warning",
    description:
      "Penyakit mottle hijau yang menyebabkan pola mosaik pada daun singkong. Menghambat pertumbuhan dan fotosintesis.",
    characteristic: "Pola Mosaik pada Daun",
    icon: "🍃",
  },
  {
    id: "cmd",
    title: "Cassava Mosaic Disease (CMD)",
    shortName: "CMD",
    type: "Virus",
    risk: "Tinggi",
    riskColor: "danger",
    description:
      "Penyakit mosaik singkong paling destruktif di Afrika. Ditularkan oleh kutu kebul Bemisia tabaci.",
    characteristic: "Penyakit Paling Destruktif",
    icon: "⚠️",
  },
];

function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="about-hero-content"
          >
            <motion.div variants={fadeUp} className="about-hero-badge">
              <FaLeaf />
              <span>Informasi Penyakit</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="about-hero-title">
              Penyakit Daun Singkong
            </motion.h1>
            <motion.p variants={fadeUp} className="about-hero-desc">
              Kenali berbagai jenis penyakit yang menyerang tanaman singkong dan
              cara identifikasinya untuk penanganan yang tepat
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="container">
          <div className="stats-grid">
            {[
              { value: "4", label: "Jenis Penyakit", icon: <FaExclamationTriangle /> },
              { value: "1", label: "Kelas Sehat", icon: <FaShieldAlt /> },
              { value: "5", label: "Total Kelas", icon: <FaSeedling /> },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="stat-card"
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disease Cards */}
      <section className="section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="disease-grid"
          >
            {diseases.map((disease) => (
              <motion.div key={disease.id} variants={fadeUp}>
                <Link to={`/disease/${disease.id}`} className="disease-card">
                  <div className="disease-card-header">
                    <span className="disease-emoji">{disease.icon}</span>
                    <div className="disease-badges">
                      <span className="badge badge-info">{disease.type}</span>
                      <span className={`badge badge-${disease.riskColor}`}>
                        {disease.risk}
                      </span>
                    </div>
                  </div>
                  <h3 className="disease-card-title">{disease.title}</h3>
                  <p className="disease-card-desc">{disease.description}</p>
                  <div className="disease-card-footer">
                    <span className="disease-char">
                      <FaLeaf className="dc-icon" />
                      {disease.characteristic}
                    </span>
                    <FaArrowRight className="disease-arrow" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default About;
