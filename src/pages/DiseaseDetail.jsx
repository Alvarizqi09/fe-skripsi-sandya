import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaLeaf,
  FaShieldAlt,
  FaSeedling,
  FaArrowLeft,
  FaExclamationTriangle,
  FaCheckCircle,
  FaFlask,
} from "react-icons/fa";
import "./DiseaseDetail.css";

const diseases = [
  {
    id: "cbb",
    title: "Cassava Bacterial Blight",
    shortName: "CBB",
    type: "Bakteri",
    risk: "Tinggi",
    riskColor: "danger",
    icon: "🦠",
    pathogen: "Xanthomonas axonopodis pv. manihotis",
    description:
      "Cassava Bacterial Blight (CBB) adalah penyakit serius pada tanaman singkong yang disebabkan oleh bakteri Xanthomonas axonopodis pv. manihotis. Penyakit ini menyerang daun, batang, dan jaringan pembuluh, menyebabkan layu dan kematian tanaman pada serangan berat.",
    symptoms: [
      "Bercak angular pada daun berwarna coklat kehitaman",
      "Layu pada pucuk tanaman (die-back)",
      "Eksudat bakteri berupa getah pada batang",
      "Daun menguning dan gugur prematur",
      "Nekrosis vaskular pada batang",
    ],
    prevention: [
      "Gunakan stek bersih dari tanaman sehat dan teruji",
      "Sanitasi lahan secara menyeluruh sebelum tanam",
      "Rotasi tanaman minimal 1-2 tahun",
      "Hindari bekerja di lahan saat tanaman basah",
      "Tanam varietas tahan CBB yang sudah teruji",
    ],
    treatment:
      "Tidak ada pengobatan kimiawi yang efektif. Fokus pada pencegahan melalui penggunaan material tanam bersih, eradikasi tanaman terinfeksi, dan aplikasi bakterisida berbahan tembaga sebagai tindakan preventif.",
    spreadMethod:
      "Melalui stek terinfeksi, hujan, dan peralatan terkontaminasi",
    damageLevel: "70-100% pada serangan berat",
  },
  {
    id: "cbsd",
    title: "Cassava Brown Streak Disease",
    shortName: "CBSD",
    type: "Virus",
    risk: "Tinggi",
    riskColor: "danger",
    icon: "🔬",
    pathogen: "Cassava brown streak virus (CBSV) & Uganda CBSV (UCBSV)",
    description:
      "Cassava Brown Streak Disease (CBSD) adalah penyakit virus yang menyerang singkong, menyebabkan nekrosis coklat pada umbi yang mengurangi kualitas dan nilai ekonomi panen secara drastis. Penyakit ini ditularkan oleh kutu kebul (whitefly).",
    symptoms: [
      "Bercak kuning kecoklatan pada daun (klorosis vein)",
      "Nekrosis coklat kering pada umbi",
      "Garis-garis coklat (streaks) pada batang hijau",
      "Klorosis vein terutama pada daun muda",
      "Umbi mengeras dan tidak layak konsumsi",
    ],
    prevention: [
      "Gunakan varietas tahan CBSD",
      "Tanam stek dari sumber bebas virus",
      "Kendalikan populasi kutu kebul secara terpadu",
      "Roguing tanaman terinfeksi sedini mungkin",
      "Monitoring rutin terutama saat musim kering",
    ],
    treatment:
      "Tidak ada obat untuk infeksi virus. Pengendalian fokus pada penggunaan varietas tahan, eliminasi tanaman terinfeksi, dan pengendalian vektor kutu kebul melalui metode IPM (Integrated Pest Management).",
    spreadMethod: "Kutu kebul (Bemisia tabaci) dan stek terinfeksi",
    damageLevel: "50-100% pada umbi yang terinfeksi",
  },
  {
    id: "cgm",
    title: "Cassava Green Mottle",
    shortName: "CGM",
    type: "Virus",
    risk: "Sedang",
    riskColor: "warning",
    icon: "🍃",
    pathogen: "Cassava green mottle virus (CsGMV)",
    description:
      "Cassava Green Mottle (CGM) adalah penyakit virus yang menyebabkan pola mosaik hijau muda dan hijau tua pada daun singkong. Meskipun dampaknya lebih ringan dibanding CMD atau CBSD, penyakit ini tetap menurunkan produktivitas tanaman.",
    symptoms: [
      "Pola mosaik hijau muda dan hijau tua pada daun",
      "Distorsi ringan pada bentuk daun",
      "Pertumbuhan tanaman sedikit terhambat",
      "Ukuran daun lebih kecil dari normal",
      "Klorosis ringan pada daun muda",
    ],
    prevention: [
      "Gunakan material tanam (stek) bebas virus",
      "Buang dan musnahkan tanaman terinfeksi berat",
      "Kendalikan vektor penular secara berkala",
      "Tingkatkan nutrisi tanaman untuk ketahanan",
      "Monitoring lapangan secara berkala",
    ],
    treatment:
      "Tidak ada pengobatan spesifik. Manajemen fokus pada pencegahan melalui material tanam sehat, nutrisi tanaman yang baik, dan pengendalian vektor. Tanaman dengan infeksi ringan masih dapat produktif.",
    spreadMethod: "Vektor serangga dan stek terinfeksi",
    damageLevel: "30-50% penurunan hasil",
  },
  {
    id: "cmd",
    title: "Cassava Mosaic Disease",
    shortName: "CMD",
    type: "Virus",
    risk: "Tinggi",
    riskColor: "danger",
    icon: "⚠️",
    pathogen: "Cassava mosaic geminiviruses (CMGs)",
    description:
      "Cassava Mosaic Disease (CMD) adalah penyakit virus paling destruktif pada singkong di Afrika. Disebabkan oleh kelompok geminivirus dan ditularkan oleh kutu kebul Bemisia tabaci. Menyebabkan kerugian ekonomi yang sangat signifikan.",
    symptoms: [
      "Mosaik kuning-hijau yang mencolok pada daun",
      "Daun mengecil, berkerut, dan menggulung",
      "Pertumbuhan tanaman kerdil (stunting)",
      "Misshapen leaves (daun berbentuk tidak normal)",
      "Penurunan produksi umbi signifikan",
    ],
    prevention: [
      "Tanam varietas tahan CMD yang sudah teruji",
      "Gunakan stek dari tanaman induk bebas virus",
      "Kendalikan kutu kebul Bemisia tabaci",
      "Roguing (cabut) tanaman terinfeksi sedini mungkin",
      "Penanaman serentak untuk mengurangi sumber inokulum",
    ],
    treatment:
      "Tidak ada pengobatan langsung. Strategi pengendalian meliputi penggunaan varietas tahan (breeding), pengelolaan vektor kutu kebul secara terpadu, dan program sertifikasi stek bersih (clean seed program).",
    spreadMethod: "Kutu kebul (Bemisia tabaci) dan stek terinfeksi",
    damageLevel: "20-95% tergantung varietas dan strain virus",
  },
];

function DiseaseDetail() {
  const { id } = useParams();
  const disease = diseases.find((d) => d.id === id);

  if (!disease) {
    return (
      <div className="disease-not-found">
        <h2>Penyakit tidak ditemukan</h2>
        <Link to="/about" className="btn btn-primary">
          <FaArrowLeft />
          Kembali
        </Link>
      </div>
    );
  }

  return (
    <div className="disease-detail-page">
      {/* Hero */}
      <section className="dd-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="dd-hero-content"
          >
            <Link to="/about" className="dd-back-link" id="back-to-about">
              <FaArrowLeft />
              Kembali ke Daftar Penyakit
            </Link>
            <div className="dd-hero-header">
              <span className="dd-hero-emoji">{disease.icon}</span>
              <div>
                <h1 className="dd-hero-title">{disease.title}</h1>
                <div className="dd-hero-badges">
                  <span className="badge badge-info">{disease.type}</span>
                  <span className={`badge badge-${disease.riskColor}`}>
                    Risiko {disease.risk}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container dd-content">
        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="dd-card dd-description"
        >
          <h2 className="dd-card-title">
            <FaLeaf className="dd-icon" />
            Deskripsi
          </h2>
          <p className="dd-card-text">{disease.description}</p>
        </motion.div>

        <div className="dd-grid">
          {/* Symptoms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="dd-card dd-symptoms"
          >
            <h2 className="dd-card-title">
              <FaExclamationTriangle className="dd-icon dd-icon-warning" />
              Gejala
            </h2>
            <ul className="dd-list">
              {disease.symptoms.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                >
                  {s}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Prevention */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="dd-card dd-prevention"
          >
            <h2 className="dd-card-title">
              <FaShieldAlt className="dd-icon dd-icon-success" />
              Pencegahan
            </h2>
            <ul className="dd-list dd-list-check">
              {disease.prevention.map((p, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                >
                  {p}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Treatment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="dd-card dd-treatment"
        >
          <h2 className="dd-card-title">
            <FaCheckCircle className="dd-icon dd-icon-success" />
            Penanganan
          </h2>
          <p className="dd-card-text">{disease.treatment}</p>
        </motion.div>

        {/* Scientific Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="dd-card"
        >
          <h2 className="dd-card-title">
            <FaFlask className="dd-icon" />
            Informasi Ilmiah
          </h2>
          <div className="dd-info-grid">
            <div className="dd-info-item">
              <span className="dd-info-label">Patogen</span>
              <span className="dd-info-value">{disease.pathogen}</span>
            </div>
            <div className="dd-info-item">
              <span className="dd-info-label">Tipe</span>
              <span className="dd-info-value">{disease.type}</span>
            </div>
            <div className="dd-info-item">
              <span className="dd-info-label">Penyebaran</span>
              <span className="dd-info-value">{disease.spreadMethod}</span>
            </div>
            <div className="dd-info-item">
              <span className="dd-info-label">Tingkat Kerusakan</span>
              <span className="dd-info-value">{disease.damageLevel}</span>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="dd-cta"
        >
          <Link to="/predict" className="btn btn-primary" id="dd-predict-cta">
            <FaSeedling />
            Cek Daun Singkong Anda
          </Link>
          <Link to="/about" className="btn btn-outline" id="dd-back-btn">
            <FaArrowLeft />
            Daftar Penyakit Lain
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default DiseaseDetail;
