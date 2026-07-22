import { useState, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLeaf,
  FaExclamationTriangle,
  FaCheckCircle,
  FaSpinner,
  FaTimes,
  FaRedo,
  FaSeedling,
  FaCloudUploadAlt,
} from "react-icons/fa";
import "./Predict.css";

// Backend API URL - ganti sesuai deployment
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

function Predict() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (file) => {
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setPrediction(null);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files[0]) {
      handleImageChange(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleSubmit = async () => {
    if (!image) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(`${API_URL}/predict`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPrediction(response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
      setPrediction({
        predicted_class: "Error",
        confidence: 0,
        message: "Gagal memproses gambar. Pastikan backend sudah berjalan.",
        symptoms: [],
        treatment: [],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setPreview(null);
    setPrediction(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getStatusColor = (predicted) => {
    if (predicted === "Healthy") return "success";
    if (predicted === "Error") return "error";
    if (predicted === "Unidentified Object") return "unidentified";
    return "warning";
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return "var(--green-500)";
    if (confidence >= 0.7) return "var(--amber-500)";
    return "var(--red-500)";
  };

  return (
    <div className="predict-page">
      {/* Header Section */}
      <section className="predict-hero">
        <div className="container-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="predict-hero-content"
          >
            <div className="predict-hero-icon">
              <FaSeedling />
            </div>
            <h1 className="predict-hero-title">Prediksi Penyakit Daun</h1>
            <p className="predict-hero-desc">
              Upload gambar daun singkong untuk mendapatkan diagnosis penyakit
              menggunakan model AI
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-sm predict-content">
        <div className="predict-card">
          {/* Upload Area */}
          {!preview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`upload-zone ${dragOver ? "upload-zone-active" : ""}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              id="upload-zone"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                hidden
                id="file-input"
              />
              <div className="upload-zone-content">
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="upload-icon"
                >
                  <FaCloudUploadAlt />
                </motion.div>
                <h3 className="upload-title">
                  Drag & drop gambar daun singkong
                </h3>
                <p className="upload-subtitle">
                  atau klik untuk memilih file dari perangkat Anda
                </p>
                <div className="upload-formats">
                  <span>JPG</span>
                  <span>PNG</span>
                  <span>WEBP</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Preview & Results */}
          {preview && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="preview-section"
            >
              {/* Image Preview */}
              <div className="preview-image-wrapper">
                <img
                  src={preview}
                  alt="Preview daun"
                  className="preview-image"
                />
                <button
                  className="preview-close"
                  onClick={handleReset}
                  title="Hapus gambar"
                  id="reset-btn"
                >
                  <FaTimes />
                </button>
                {prediction && (
                  <div
                    className={`preview-status-badge psb-${getStatusColor(prediction.predicted_class)}`}
                  >
                    {prediction.predicted_class === "Healthy" ? (
                      <FaCheckCircle />
                    ) : prediction.predicted_class === "Error" ? (
                      <FaExclamationTriangle />
                    ) : prediction.predicted_class === "Unidentified Object" ? (
                      <FaExclamationTriangle />
                    ) : (
                      <FaExclamationTriangle />
                    )}
                    <span>{prediction.predicted_class}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {!prediction && !loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="predict-actions"
                >
                  <button
                    className="btn btn-primary predict-submit-btn"
                    onClick={handleSubmit}
                    id="predict-btn"
                  >
                    <FaLeaf />
                    Analisis Sekarang
                  </button>
                  <button
                    className="btn btn-outline predict-change-btn"
                    onClick={handleReset}
                    id="change-image-btn"
                  >
                    <FaRedo />
                    Ganti Gambar
                  </button>
                </motion.div>
              )}

              {/* Loading */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="loading-section"
                >
                  <div className="loading-spinner">
                    <FaSpinner className="spin-icon" />
                  </div>
                  <p className="loading-text">Menganalisis gambar...</p>
                  <p className="loading-subtext">
                    Model EfficientNetB0 + CBAM sedang memproses
                  </p>
                </motion.div>
              )}

              {/* Results */}
              <AnimatePresence>
                {prediction && prediction.predicted_class !== "Error" && prediction.predicted_class !== "Unidentified Object" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="result-section"
                  >
                    {/* Confidence */}
                    <div className="result-confidence">
                      <div className="confidence-header">
                        <span className="confidence-label">
                          Tingkat Keyakinan
                        </span>
                        <span
                          className="confidence-value"
                          style={{
                            color: getConfidenceColor(prediction.confidence),
                          }}
                        >
                          {(prediction.confidence * 100).toFixed(2)}%
                        </span>
                      </div>
                      <div className="confidence-bar-bg">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${prediction.confidence * 100}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="confidence-bar"
                          style={{
                            background: `linear-gradient(90deg, ${getConfidenceColor(prediction.confidence)}, var(--emerald-400))`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Description */}
                    {prediction.description && (
                      <div className="result-card">
                        <h4 className="result-card-title">
                          <FaLeaf className="rct-icon" />
                          Deskripsi
                        </h4>
                        <p className="result-card-text">
                          {prediction.description}
                        </p>
                      </div>
                    )}

                    {/* Symptoms */}
                    {prediction.symptoms && prediction.symptoms.length > 0 && (
                      <div className="result-card result-card-warning">
                        <h4 className="result-card-title">
                          <FaExclamationTriangle className="rct-icon rct-warning" />
                          Gejala
                        </h4>
                        <ul className="result-list">
                          {prediction.symptoms.map((s, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              {s}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Treatment */}
                    {prediction.treatment &&
                      prediction.treatment.length > 0 && (
                        <div className="result-card result-card-success">
                          <h4 className="result-card-title">
                            <FaCheckCircle className="rct-icon rct-success" />
                            Rekomendasi Penanganan
                          </h4>
                          <ul className="result-list">
                            {prediction.treatment.map((t, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                              >
                                {t}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}

                    {/* All Probabilities */}
                    {prediction.all_probabilities && (
                      <div className="result-card">
                        <h4 className="result-card-title">
                          <FaLeaf className="rct-icon" />
                          Probabilitas Semua Kelas
                        </h4>
                        <div className="prob-list">
                          {Object.entries(prediction.all_probabilities)
                            .sort(([, a], [, b]) => b - a)
                            .map(([name, prob]) => (
                              <div key={name} className="prob-item">
                                <div className="prob-info">
                                  <span className="prob-name">{name}</span>
                                  <span className="prob-value">
                                    {(prob * 100).toFixed(2)}%
                                  </span>
                                </div>
                                <div className="prob-bar-bg">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${prob * 100}%` }}
                                    transition={{ duration: 0.8 }}
                                    className="prob-bar"
                                    style={{
                                      background:
                                        name === prediction.predicted_class
                                          ? "linear-gradient(90deg, var(--green-500), var(--emerald-400))"
                                          : "var(--gray-300)",
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Try Again */}
                    <div className="result-actions">
                      <button
                        className="btn btn-primary"
                        onClick={handleReset}
                        id="try-again-btn"
                      >
                        <FaRedo />
                        Coba Gambar Lain
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Unidentified Object State */}
                {prediction && prediction.predicted_class === "Unidentified Object" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="result-section"
                  >
                    <div className="unidentified-card">
                      <div className="unidentified-icon">
                        <FaExclamationTriangle />
                      </div>
                      <h3 className="unidentified-title">Objek Tidak Dikenali</h3>
                      <p className="unidentified-desc">
                        {prediction.description}
                      </p>

                      {/* Alasan Penolakan */}
                      {prediction.reject_reasons && prediction.reject_reasons.length > 0 && (
                        <div className="result-card result-card-warning" style={{ marginTop: "1.25rem", textAlign: "left" }}>
                          <h4 className="result-card-title">
                            <FaExclamationTriangle className="rct-icon rct-warning" />
                            Alasan Tidak Dikenali
                          </h4>
                          <ul className="result-list">
                            {prediction.reject_reasons.map((reason, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.15 }}
                              >
                                {reason}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Quick Stats: Green Ratio + Margin */}
                      <div className="unidentified-stats">
                        {prediction.green_ratio !== undefined && (
                          <div className="unidentified-stat">
                            <span className="ustat-label">Piksel Hijau</span>
                            <span className={`ustat-value ${prediction.green_ratio >= 0.18 ? "ustat-ok" : "ustat-fail"}`}>
                              {(prediction.green_ratio * 100).toFixed(1)}%
                            </span>
                          </div>
                        )}
                        {prediction.margin !== undefined && (
                          <div className="unidentified-stat">
                            <span className="ustat-label">Margin Top-1 vs Top-2</span>
                            <span className={`ustat-value ${prediction.margin >= 0.12 ? "ustat-ok" : "ustat-fail"}`}>
                              {(prediction.margin * 100).toFixed(1)}%
                            </span>
                          </div>
                        )}
                        <div className="unidentified-stat">
                          <span className="ustat-label">Confidence</span>
                          <span className={`ustat-value ${prediction.confidence >= 0.65 ? "ustat-ok" : "ustat-fail"}`}>
                            {(prediction.confidence * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      {/* All Probabilities */}
                      {prediction.all_probabilities && (
                        <div className="result-card" style={{ marginTop: "1rem", textAlign: "left" }}>
                          <h4 className="result-card-title">
                            <FaLeaf className="rct-icon" />
                            Probabilitas Semua Kelas
                          </h4>
                          <div className="prob-list">
                            {Object.entries(prediction.all_probabilities)
                              .sort(([, a], [, b]) => b - a)
                              .map(([name, prob]) => (
                                <div key={name} className="prob-item">
                                  <div className="prob-info">
                                    <span className="prob-name">{name}</span>
                                    <span className="prob-value">
                                      {(prob * 100).toFixed(2)}%
                                    </span>
                                  </div>
                                  <div className="prob-bar-bg">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${prob * 100}%` }}
                                      transition={{ duration: 0.8 }}
                                      className="prob-bar"
                                      style={{
                                        background: "var(--gray-300)",
                                      }}
                                    />
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}

                      {prediction.treatment && prediction.treatment.length > 0 && (
                        <div className="result-card result-card-success" style={{ marginTop: "1rem", textAlign: "left" }}>
                          <h4 className="result-card-title">
                            <FaCheckCircle className="rct-icon rct-success" />
                            Tips
                          </h4>
                          <ul className="result-list">
                            {prediction.treatment.map((t, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                              >
                                {t}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="result-actions" style={{ marginTop: "1.5rem" }}>
                        <button
                          className="btn btn-primary"
                          onClick={handleReset}
                          id="try-again-unidentified-btn"
                        >
                          <FaRedo />
                          Coba Gambar Lain
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Error State */}
                {prediction && prediction.predicted_class === "Error" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="error-section"
                  >
                    <FaExclamationTriangle className="error-icon" />
                    <p className="error-text">{prediction.message}</p>
                    <button
                      className="btn btn-outline"
                      onClick={handleReset}
                      id="error-retry-btn"
                    >
                      <FaRedo />
                      Coba Lagi
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Predict;
