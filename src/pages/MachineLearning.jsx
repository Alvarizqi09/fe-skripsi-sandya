import { motion } from "framer-motion";
import {
  FaChartLine,
  FaLayerGroup,
  FaBrain,
  FaBalanceScale,
  FaDatabase,
  FaProjectDiagram,
} from "react-icons/fa";
import "./MachineLearning.css";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function MachineLearning() {
  return (
    <div className="ml-page">
      {/* Hero */}
      <section className="ml-hero">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="ml-hero-content">
            <motion.div variants={fadeUp} className="ml-hero-badge">
              <FaBrain />
              <span>Deep Learning Architecture</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="ml-hero-title">
              Arsitektur Klasifikasi Penyakit Daun Singkong
            </motion.h1>
            <motion.p variants={fadeUp} className="ml-hero-desc">
              Implementasi EfficientNetB0 dengan Convolutional Block Attention Module (CBAM)
              dan Oversampling untuk klasifikasi 5 kelas penyakit daun singkong
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="container ml-content">

        {/* Research Results */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="ml-card">
          <div className="ml-card-header">
            <div className="ml-card-icon mci-green"><FaChartLine /></div>
            <h2 className="ml-card-title">📊 Hasil Utama Penelitian</h2>
          </div>
          <div className="ml-results-grid">
            <div className="ml-results-left">
              <h3 className="ml-subtitle">Performansi Model</h3>
              <div className="metrics-stack">
                {[
                  { value: "—", label: "Akurasi Validasi", sub: "Pada dataset validasi", bg: "var(--green-50)", border: "var(--green-100)", color: "var(--green-700)" },
                  { value: "—", label: "Akurasi Testing",  sub: "Pada dataset testing",  bg: "#eff6ff", border: "#dbeafe", color: "var(--blue-500)" },
                  { value: "—", label: "Akurasi Training", sub: "Pada dataset pelatihan", bg: "#f5f3ff", border: "#ede9fe", color: "var(--purple-500)" },
                ].map((m, i) => (
                  <motion.div key={i} variants={fadeUp} className="metric-item"
                    style={{ background: m.bg, borderColor: m.border }}>
                    <div className="metric-value" style={{ color: m.color }}>{m.value}</div>
                    <div className="metric-info">
                      <div className="metric-label">{m.label}</div>
                      <div className="metric-sub">{m.sub}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="ml-note">* Hasil akan diperbarui setelah pelatihan model selesai</p>
            </div>
            <div className="ml-results-right">
              <h3 className="ml-subtitle">Metrik Klasifikasi</h3>
              <div className="metrics-table-wrapper">
                <table className="metrics-table">
                  <thead>
                    <tr><th>Kelas</th><th>Precision</th><th>Recall</th><th>F1-Score</th></tr>
                  </thead>
                  <tbody>
                    {["CBB","CBSD","CGM","CMD","Healthy"].map((name, i) => (
                      <tr key={i}><td className="td-name">{name}</td><td>—</td><td>—</td><td>—</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="ml-table-note">* Diisi setelah evaluasi model selesai</p>
            </div>
          </div>
        </motion.div>

        {/* CBAM Section */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="ml-card">
          <div className="ml-card-header">
            <div className="ml-card-icon mci-purple"><FaProjectDiagram /></div>
            <h2 className="ml-card-title">Convolutional Block Attention Module (CBAM)</h2>
          </div>
          <div className="ml-two-col">
            <motion.div variants={fadeUp}>
              <h3 className="ml-subtitle">Implementasi CBAM</h3>
              <p className="ml-text">
                CBAM diterapkan pada output 3 layer EfficientNetB0 untuk meningkatkan fokus model
                pada fitur penting. Terdiri dari dua sub-modul:
              </p>
              <div className="cbam-modules">
                <div className="cbam-module">
                  <h4 className="cbam-module-title">Channel Attention</h4>
                  <p className="cbam-module-desc">
                    Global Avg + Max Pooling diikuti shared MLP menghasilkan channel-wise attention.
                    Fokus pada <em>apa</em> yang penting dari fitur.
                  </p>
                </div>
                <div className="cbam-module">
                  <h4 className="cbam-module-title">Spatial Attention</h4>
                  <p className="cbam-module-desc">
                    Avg + Max pooling antar channel, diikuti Conv2D 7×7 menghasilkan spatial map.
                    Fokus pada <em>di mana</em> fitur penting berada.
                  </p>
                </div>
              </div>
              <div className="cbam-layers">
                <h4 className="ml-small-title">Target Layers CBAM</h4>
                {["block3a_expand_activation","block5a_expand_activation","top_activation"].map((l, i) => (
                  <div key={i} className="cbam-layer-item">
                    <span className="cli-dot" /><code>{l}</code>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp}>
              <h3 className="ml-subtitle">Kode CBAM</h3>
              <div className="code-block">
                <pre><code>{`class ChannelAttention(Layer):
  def build(self, input_shape):
    ch = input_shape[-1]
    self.dense = Dense(ch // 8, 'relu')
    self.fc    = Dense(ch, 'sigmoid')

  def call(self, x):
    avg = GlobalAveragePooling2D()(x)
    max = GlobalMaxPooling2D()(x)
    out = Add()([self.fc(self.dense(avg)),
                 self.fc(self.dense(max))])
    return Multiply()([x,
      Reshape((1,1,-1))(out)])

class SpatialAttention(Layer):
  def call(self, x):
    avg = mean(x, axis=-1, keepdims=True)
    max = max(x,  axis=-1, keepdims=True)
    cat = Concatenate()([avg, max])
    att = Conv2D(1, 7, 'same',
            activation='sigmoid')(cat)
    return Multiply()([x, att])`}</code></pre>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* EfficientNetB0 Section */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="ml-card">
          <div className="ml-card-header">
            <div className="ml-card-icon mci-blue"><FaLayerGroup /></div>
            <h2 className="ml-card-title">Arsitektur EfficientNetB0</h2>
          </div>
          <div className="ml-two-col">
            <motion.div variants={fadeUp}>
              <h3 className="ml-subtitle">Transfer Learning + CBAM</h3>
              <p className="ml-text">
                EfficientNetB0 pre-trained ImageNet digunakan sebagai backbone. CBAM ditambahkan
                pada 3 layer target, outputnya di-pool dan di-concatenate sebelum masuk classification head.
              </p>
              <h4 className="ml-small-title">Konfigurasi Model:</h4>
              <ul className="config-list">
                {[
                  "Input: 224×224×3 (RGB)",
                  "Base: EfficientNetB0 (ImageNet pre-trained)",
                  "CBAM pada 3 target layers",
                  "GlobalAvgPool → Concatenate",
                  "Dense(512, ReLU, L2=1e-4)",
                  "BatchNorm → Dropout(0.4)",
                  "Output: Dense(5, Softmax)",
                ].map((item, i) => (
                  <li key={i}><span className="config-check">✓</span>{item}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp}>
              <div className="training-details">
                <h4 className="ml-small-title">Detail Pelatihan</h4>
                <div className="training-grid">
                  {[
                    { label: "Optimizer", value: "AdamW" },
                    { label: "Learning Rate", value: "1e-5" },
                    { label: "Epochs", value: "50 (max)" },
                    { label: "Batch Size", value: "32" },
                    { label: "Loss", value: "Categorical CE" },
                    { label: "LR Scheduler", value: "ReduceLROnPlateau" },
                    { label: "Patience (LR)", value: "3 epochs" },
                    { label: "Min LR", value: "1e-7" },
                  ].map((item, i) => (
                    <div key={i} className="training-item">
                      <span className="ti-label">{item.label}</span>
                      <span className="ti-value">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="architecture-summary">
                <h4 className="ml-small-title">Alur Arsitektur</h4>
                <div className="arch-flow">
                  {[
                    "EfficientNetB0 (base)",
                    "CBAM × 3 layers",
                    "GlobalAvgPool × 3",
                    "Concatenate",
                    "Dense(512) + BN",
                    "Dropout(0.4)",
                    "Dense(5, Softmax)",
                  ].map((step, i) => (
                    <div key={i} className="arch-step">
                      <span className="arch-step-num">{i + 1}</span>
                      <span className="arch-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Oversampling Section */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="ml-card">
          <div className="ml-card-header">
            <div className="ml-card-icon mci-amber"><FaBalanceScale /></div>
            <h2 className="ml-card-title">Oversampling</h2>
          </div>
          <div className="ml-two-col">
            <motion.div variants={fadeUp}>
              <h3 className="ml-subtitle">Penanganan Data Imbalance</h3>
              <p className="ml-text">
                Dataset Cassava memiliki distribusi kelas yang tidak seimbang. Oversampling dilakukan
                dengan menduplikasi gambar kelas minoritas hingga jumlahnya menyamai kelas terbesar
                pada tiap split (train / val / test).
              </p>
              <div className="dataset-split">
                {[
                  { label: "Training", pct: "70%", w: "70%", color: "var(--green-500)" },
                  { label: "Validation", pct: "15%", w: "15%", color: "var(--blue-500)" },
                  { label: "Testing", pct: "15%", w: "15%", color: "var(--purple-500)" },
                ].map((s, i) => (
                  <div key={i} className="split-item">
                    <div className="split-bar" style={{ width: s.w, background: s.color }} />
                    <div className="split-info">
                      <span className="split-label">{s.label}</span>
                      <span className="split-pct">{s.pct}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp}>
              <h3 className="ml-subtitle">Kode Oversampling</h3>
              <div className="code-block">
                <pre><code>{`for split in ["train", "val", "test"]:
    split_path = os.path.join(out_dir, split)
    counts = {
        cat: len(os.listdir(
            os.path.join(split_path, cat)))
        for cat in os.listdir(split_path)
    }
    max_count = max(counts.values())

    for category in counts:
        cat_dir = os.path.join(split_path,
                               category)
        images = os.listdir(cat_dir)
        deficit = max_count - len(images)
        for i in range(deficit):
            src = images[i % len(images)]
            shutil.copy(
                os.path.join(cat_dir, src),
                os.path.join(cat_dir,
                    f"dup_{i}_{src}")
            )`}</code></pre>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Data Augmentation */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="ml-card">
          <div className="ml-card-header">
            <div className="ml-card-icon mci-green"><FaDatabase /></div>
            <h2 className="ml-card-title">Data Augmentation & Preprocessing</h2>
          </div>
          <div className="ml-two-col">
            <motion.div variants={fadeUp}>
              <h3 className="ml-subtitle">Augmentasi Training</h3>
              <div className="aug-grid">
                {[
                  { param: "Rotation", value: "±20°" },
                  { param: "Width Shift", value: "10%" },
                  { param: "Height Shift", value: "10%" },
                  { param: "Shear", value: "10%" },
                  { param: "Zoom", value: "±15%" },
                  { param: "Horizontal Flip", value: "Ya" },
                  { param: "Brightness", value: "0.9–1.1" },
                  { param: "Fill Mode", value: "Nearest" },
                ].map((aug, i) => (
                  <div key={i} className="aug-item">
                    <span className="aug-param">{aug.param}</span>
                    <span className="aug-value">{aug.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp}>
              <h3 className="ml-subtitle">Preprocessing</h3>
              <ul className="config-list">
                {[
                  "Resize ke 224×224 pixel",
                  "EfficientNet preprocess_input",
                  "Normalisasi nilai piksel otomatis",
                  "Val & Test: hanya preprocessing (no augmentasi)",
                ].map((item, i) => (
                  <li key={i}><span className="config-check">✓</span>{item}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Evaluation */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="ml-card">
          <div className="ml-card-header">
            <div className="ml-card-icon mci-green"><FaChartLine /></div>
            <h2 className="ml-card-title">Evaluasi Model</h2>
          </div>
          <div className="ml-two-col">
            <motion.div variants={fadeUp}>
              <h3 className="ml-subtitle">Confusion Matrix</h3>
              <div className="placeholder-box">
                <FaChartLine className="placeholder-icon" />
                <p>Akan ditampilkan setelah training selesai</p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp}>
              <h3 className="ml-subtitle">Training History</h3>
              <div className="placeholder-box">
                <FaChartLine className="placeholder-icon" />
                <p>Grafik accuracy &amp; loss akan ditampilkan setelah training</p>
              </div>
            </motion.div>
          </div>
          <motion.div variants={fadeUp} className="eval-metrics">
            <h3 className="ml-subtitle">Metode Evaluasi</h3>
            <div className="eval-methods-grid">
              {[
                { name: "Accuracy",  desc: "Persentase prediksi benar dari total prediksi" },
                { name: "Precision", desc: "Ketepatan prediksi positif untuk setiap kelas" },
                { name: "Recall",    desc: "Kemampuan menemukan semua sampel positif" },
                { name: "F1-Score",  desc: "Harmonic mean dari Precision dan Recall" },
              ].map((m, i) => (
                <div key={i} className="eval-method-card">
                  <h4 className="emc-title">{m.name}</h4>
                  <p className="emc-desc">{m.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}

export default MachineLearning;
