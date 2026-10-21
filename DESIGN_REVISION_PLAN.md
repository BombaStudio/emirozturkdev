# Frontend Tasarım Revizyon Planı v2 — apple-design

> Hedef: Mevcut "Quiet Luxury" (sıcak krem `#f8f7f4` + mürekkep `#1a1a18`) estetiğini
> koruyup, Apple'ın *Designing Fluid Interfaces* prensiplerini (spring, kesintisizlik,
> hız devri, materyal) bu portfolyoya uygulamak. Sakin, hızlı, dokunulabilir.
>
> Bu sürüm, v1 taslağının üzerine **kod incelemesiyle bulunan 4 yeni kritik kusuru**
> ekler (bkz. §0.2) ve test sözleşmelerini numaralarıyla sabitler.

---

## 0. Mevcut Durum Analizi

İncelenen dosyalar: `src/app/{layout,page,globals.css}`, `src/app/{projects,contact,resume}`,
`components/header/{index,mobile-menu}.tsx`, `components/projects/projects-grid.tsx`,
`components/contact/contact-form.tsx`, `components/Footer.tsx`, `src/data/portfolio.ts`,
`scripts/run-e2e.js` (60 testlik sözleşme seti).

### 0.1 Apple prensibi → mevcut durum → boşluk

| # | Apple prensibi | Mevcut durum | Boşluk | Önem |
|---|---|---|---|---|
| 0 | **CSS katman hiyerarşisi** | `globals.css` içindeki element seçicileri (`p`, `a`, `h1..h6`) **katmansız** | Tailwind utility'leri eziliyor → renk/tracking/transitions çalışmıyor | **Kritik** |
| 1 | **§1 Response** — pointer-down'da geri bildirim | Hiçbir yerde `:active`/basınç geri bildirimi yok | Basıldığında hiçbir şey olmuyor → "ölü" his | **Yüksek** |
| 2 | **§3 Interruptibility** — güncel değerden başla | 0 spring. Tüm animasyonlar sabit süreli CSS transition | Kesilemeyen, yeniden hedeflenemeyen animasyon | **Yüksek** |
| 3 | **§4 Behavior over animation** — spring | `transition-colors`, `transition-all duration-300` | Fizik yok, duruma göre hedeflenemiyor | **Yüksek** |
| 4 | **§5/§6 Hız devri + momentum projection** | Yok | Mobil menü sadece açılıyor, sürüklenebilir değil | Orta |
| 5 | **§7 Spatial consistency** — kaynağa bağlı origin | Menü `bg-white` tam ekran; `transform-origin` yok | Tetikleyici ile içerik arasındaki mekânsal ilişki kopuk | Orta |
| 6 | **§12 Materials** — yarı saydam katman hiyerarşisi | Header'da `bg-background/90 backdrop-blur-sm` + sert `border-b`; kartlarda yüzey hiç yok | Materyal hiyerarşisi yok, kartlar "yassı metin" | **Yüksek** |
| 7 | **§14 Reduced motion** | `prefers-reduced-motion` **hiç tanımlanmamış** | Vestibular hassasiyeti olan kullanıcılar için risk | **Yüksek** |
| 8 | **§15 Typography** — boyuta özgü tracking/leading | Global `h1..h6 { letter-spacing: -0.025em }` → 12px `uppercase tracking-widest` başlıklar da negatif tracking alıyor | Boyuta özgü tracking kuralı ihlal | Orta |
| 9 | **§16 Feedback** — inline doğrulama | Form yalnızca submit sonrası hata gösteriyor | Alan bazlı inline doğrulama yok | Orta |
| 10 | **§17 Wayfinding** — aktif rota göstergesi | Header'da aktif sayfa belli değil | "Nerede olduğum" belli değil | Orta |
| 11 | **§11 Frame smoothness** | `will-change` yok, `transform/opacity` disiplini yok | Derleme ipucu yok | Düşük |
| 12 | **§13 Multimodal** (ses/haptik) | Yok | Utility'siz; **bilinçli olarak eklenmeyecek** | — |
| 13 | **§16.5 Feedback 4 türü** | Form'da "sending" metin değişimi ani, sabit genişlik yok | Layout shift + ani metin değişimi | Orta |

### 0.2 v2'de eklenen kritik bulgular (kod okuması)

**B-1 — Katmansız element seçicileri Tailwind utility'lerini eziyor.** *(En yüksek etki)*
Tailwind v4 `@import "tailwindcss"` ile `@layer theme, base, components, utilities;` ilan
eder. `globals.css` içindeki şu kurallar **katmansız** yazıldığı için CSS cascade
sırasında **utility katmanını yener**:

```css
p { color: var(--color-muted); }               /* → text-foreground/80 çalışmıyor  */
a { transition: color 0.2s ease; }             /* → transition-all çalışmıyor      */
h1,h2,h3,h4,h5,h6 { letter-spacing: -0.025em; } /* → tracking-widest çalışmıyor   */
```

Somut etkiler (bugün görünen):
- Ana sayfadaki "About" paragrafı `text-foreground/80` yazmasına rağmen **muted** görünüyor.
- Hero ve filtre butonlarındaki `transition-all` yalnızca `color` geçişine düşüyor;
  `underline decoration` geçişi animasyonsuz.
- 12px `uppercase tracking-widest` mono etiketler harflerinin arası sıkışık.

**Düzeltme:** Bu kurallar `@layer base { ... }` içine alınır. Katmanlı kurallar
utility'lere **kaybeder** → istenen sınıflar kazanır. Görsel değişim "küçük" değil,
hiyerarşinin tamamını etkiler ve **Faz 1'in ana işi** olmalı.

**B-2 — `mobile-menu` palet dışı.** Overlay `bg-white` → `#f8f7f4` paletinin içinde
beyaz bir "delik". Ayrıca `duration-300` sert geçiş, Escape/focus trap yok,
`aria-modal` yok, `transform-origin` yok.

**B-3 — Header'da buton sırası test kısıtı.** `run-e2e.js` `header button` için
**ilk** butonu seçiyor (TEST_39, TEST_59). Header'a yeni bir buton (örn. tema
değiştirici) eklenirse **hamburger'dan sonra** gelmeli, aksi halde iki test kırılır.

**B-4 — Print sızıntısı riski.** Motion sarmalayıcıları print'e sızarsa ATS CV bozulur.
Tailwind v4'te important modifier **sonda** yazılır (`opacity-100!`).

### 0.3 Baseline ölçüm

- `pnpm test:e2e` → 60 test, **57 PASS / 3 FAIL** (bilinen: TEST_52 büyük/küçük harf
  `github.com/bombastudio`, TEST_53 eski nav adları `MANIFESTO`/`ENGINEERING`,
  TEST_58 kaldırılmış terminal).
- Revizyon sonrası hedef: **yeni başarısız test yok**, mevcut 3 başarısızlık aynen kalır
  (onlar ürün kararı, tasarım değil).

---

## 1. Tasarım Yönü

**Karar:** Palet ve tipografi yaklaşımı korunur ("Quiet Luxury" zaten Apple'ın
"Doğru İş" hissine yakın: sakin, tipografi odaklı, dekorasyonsuz). Değişen şey
**malzeme ve hareket**:

1. **Tipografi hiyerarşisi korunur**, ama ölçülendirilir (display / title / label / body
   seti, boyuta-bağımlı tracking).
2. **Yarı saydam materyaller** krom yerine: header, proje kartları, filtre segmenti,
   mobil sheet.
3. **Hareket fiziksel**: her dokunulabilir yüzey spring ile; her "geliş" hareketi
   kaynağından doğar, gidiş yolunda simetriktir.
4. **Geri bildirim anında**: basınç, odak, sürükleme hepsi pointer-down'da.
5. **Renk hiyerarşisi dürüst olsun**: `p`, `a`, `h*` element seçicileri artık
   içerik seviyesi kararları dayatmaz (B-1).

**Yeni bağımlılık:** `motion` (Framer Motion'un güncel hali) →
`pnpm add motion` → `import { m, LazyMotion, domAnimation } from "motion/react"`.

> **Mimari:** AGENTS.md "server-first RSC" kuralı korunur. `motion` yalnızca mevcut
> client adacıklarına (`mobile-menu`, `projects-grid`, `contact-form`, `resume-client`)
> ve yeni *küçük* adacıklara (`scroll-state`, `nav-links`, `reveal`) eklenir. Header,
> footer ve sayfa gövdeleri RSC olarak kalır; scroll durumu **CSS custom property /
> `data-` attribute** ile RSC'den düşürülür.

---

## 2. Token & Tipografi Katmanı — `src/app/globals.css`

### 2.1 Katman düzeltmesi (Faz 1'in çekirdeği)

```css
@import "tailwindcss";

@layer base {
  body { background-color: var(--color-background); color: var(--color-foreground);
         font-family: var(--font-sans); -webkit-font-smoothing: antialiased; }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-sans); font-weight: 700;
    letter-spacing: -0.025em;   /* artık base katmanda → utility kazanır */
    line-height: 1.1;
  }
  p { line-height: 1.7; color: var(--color-muted); }
  a { transition: color 0.2s ease; }
}
```

### 2.2 Token seti (mevcut adlar **korunur**: `background`, `foreground`, `muted`,
`border`, `surface`)

```css
@theme inline {
  --color-background: #f8f7f4;
  --color-foreground: #1a1a18;
  --color-muted: #7a7a76;
  --color-border: #e0dfdc;
  --color-surface: #ffffff;

  /* malzeme & yüzey hiyerarşisi */
  --color-elevated: #ffffff;
  --color-hairline: rgb(26 26 24 / 0.08);
  --color-scrim: rgb(26 26 24 / 0.32);

  /* Apple'ın yumuşak, düşük kontrastlı gölgeleri */
  --shadow-subtle: 0 1px 2px rgb(26 26 24 / 0.04), 0 4px 16px rgb(26 26 24 / 0.04);
  --shadow-lifted: 0 2px 6px rgb(26 26 24 / 0.06), 0 12px 32px rgb(26 26 24 / 0.08);

  /* hareket */
  --ease-apple: cubic-bezier(0.32, 0.72, 0, 1);
  --ease-apple-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### 2.3 Tipografi ölçeği (boyuta-bağımlı tracking + leading)

| Rol | Uygulama | tracking | leading |
|---|---|---|---|
| Display (hero) | `text-5xl md:text-7xl` + `tracking-[-0.03em] leading-[1.02]` | `-0.03em` | `1.02` |
| Title (sayfa h1) | `text-3xl sm:text-4xl` + `tracking-[-0.02em] leading-[1.1]` | `-0.02em` | `1.1` |
| Label (mono üst başlık) | `font-mono text-xs uppercase tracking-[0.12em]` | `+0.12em` | `1.4` |
| Body | `text-base leading-relaxed` | `0` | `1.6` |
| Caption | `text-xs leading-relaxed` | `+0.01em` | `1.5` |

> ⚠️ **TEST_37 kısıtı:** `/` sayfasındaki `h1` sınıfları literal **`text-5xl`** ve
> **`md:text-`** içermek zorunda. Özel `.text-display` sınıfı **tek başına** kullanılamaz;
> h1'de Tailwind ölçek sınıfları + inline `tracking/leading` birlikte kullanılır.

### 2.4 Erişilebilirlik media query'leri (§14)

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
@media (prefers-reduced-transparency: reduce) {
  .material { background: var(--color-surface) !important; backdrop-filter: none !important; }
}
@media (prefers-contrast: more) {
  .material { background: var(--color-surface) !important; border: 1px solid var(--color-foreground); }
}
```

---

## 3. Ortak Hareket Sistemi

Yeni dosya: `src/lib/motion.ts`

```ts
import type { Transition } from "motion/react";

export const spring = {
  standard: { type: "spring", bounce: 0.0, duration: 0.35 }, // UI varsayılanı (critically damped)
  snappy:   { type: "spring", bounce: 0.0, duration: 0.20 }, // buton / chip / focus
  momentum: { type: "spring", bounce: 0.2, duration: 0.40 }, // YALNIZ fırlatma sonrası
} satisfies Record<string, Transition>;

/** Apple'ın momentum projection formülü (WWDC 2018) */
export const project = (velocity: number, decel = 0.998) =>
  (velocity / 1000) * decel / (1 - decel);

/** Sınırda sert durma yerine kademeli direnç (§9) */
export const rubberband = (over: number, dim: number, c = 0.55) =>
  (over * dim * c) / (dim + c * Math.abs(over));

/** Pointer hız geçmişi → px/s */
export const velocityFromSamples = (samples: { x: number; t: number }[]) => { /* son 5 örnek */ };
```

**Basınç geri bildirimi (tüm site, §1)** — CSS tabanlı, JS maliyeti yok:

```css
@layer components {
  .pressable { transition: transform 120ms var(--ease-apple); }
  .pressable:active { transform: scale(0.97); }
  .focus-ring:focus-visible {
    outline: 2px solid var(--color-foreground);
    outline-offset: 2px;
    border-radius: inherit;
  }
}
@media (prefers-reduced-motion: reduce) { .pressable:active { transform: none; } }
```

**Kural:** Motion kullanan yüzeylerde CSS `transition` **devre dışı** bırakılır
(Motion kendi transform'unu yönetir → çakışma/jump olur). CSS kullanan yüzeylerde
Motion yoktur. İkisi asla aynı property'yi yönetmez.

---

## 4. Bileşen Bazlı Revizyon Planı

### 4.1 `components/header/index.tsx` — Malzeme + kayma kenarı (§12, §11)

- `bg-background/70 backdrop-blur-xl backdrop-saturate-150` materyal.
- Sert `border-b` **kaldırılır** → yerine **kayma kenar efekti**: içeriğin chrome ile
  buluştuğu yerde küçük blur/gradient maske.
- Scroll'da materyal "kalınlaşır": opaklık `0.70 → 0.86`, `shadow-subtle` belirir
  (Apple toolbar davranışı).
- **Aktif rota göstergesi**: aktif link altında `layoutId` ile **spring'le kayan** pill +
  `aria-current="page"`.
- Header **RSC kalır**. Scroll durumu yeni küçük client adacığıyla taşınır:

```tsx
// components/header/scroll-state.tsx → "use client"
useEffect(() => {
  const onScroll = () => document.documentElement.toggleAttribute("data-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, []);
```
CSS: `html[data-scrolled] .site-header { ... }`

> ⚠️ **B-3:** Header DOM sırası `logo(a) → nav → hamburger(button)` olarak kalır.
> Yeni buton eklenirse **hamburger'dan sonra** gelmelidir (`header button` ilk butonu
> yakalar — TEST_39/59).

### 4.2 `components/header/mobile-menu.tsx` — Gerçek bir sheet (§3, §5, §6, §7, §9)

Tam yeniden yazım:
1. **Palet:** `bg-background` + `backdrop-blur-2xl` (artık `bg-white` deliği yok).
2. **Anchored origin:** `transform-origin: top right` (hamburger konumu).
3. **Spring giriş/çıkış:** `AnimatePresence` + `spring.standard`; girişte ve çıkışta
   **aynı yol** → simetrik (§7).
4. **Drag-to-dismiss (1:1):**
   - `pointerdown` → `setPointerCapture`, **grab offset** korunur (§2).
   - `pointermove` → sheet parmağa 1:1 yapışır; üst sınırı aşarsa `rubberband`.
   - `pointerup` → **hız yönüne** bakılır: `|v| > 500 px/s` **veya** offset > %25 →
     kapat; değilse **momentum projection** ile hedefe geri dön (§6).
   - Kapanırken **serbest bırakma hızı spring'in initial velocity'si** olur (§5).
5. **Scrim:** `rgb(26 26 24 / 0.28)`, açılışta spring'le gelir.
6. **Erişilebilirlik:** `role="dialog" aria-modal="true"`, focus trap, `Escape` ile kapat,
   açılışta ilk linke odak, kapanışta **butona geri odak** (§ agency).
7. **Stagger giriş:** linkler 40 ms arayla `opacity + translateY(8px)`.
8. **Reduced motion:** `useReducedMotion()` → 150 ms opacity fade; **drag çalışmaya devam eder**
   (kullanıcı kontrolü bozulmaz).

### 4.3 `components/projects/projects-grid.tsx` — Segment + kartlar (§4, §8)

1. **Segmented control:** aktif kategori için `layoutId` + `spring.standard` ile **kayan
   pill** (Apple segmented control). Kategori adları `<button>` olarak kalır.
2. **Kart yüzeyi:** `bg-surface/70 backdrop-blur-md border border-hairline rounded-2xl
   shadow-subtle`; hover'da `translateY(-2px)` + `shadow-lifted` (**spring.snappy**),
   basınçta `scale(0.99)`.
3. **Filtre geçişi (FLIP):** `layout` + `AnimatePresence` ile kartlar yeni konumlarına
   spring'le kayar, çıkanlar `opacity+scale` ile kaybolur.
4. **"Showing X of Y"** sayacı: değer değişince **sayı yuvarlanarak** değişir.

> ⚠️ **TEST_14 kısıtı:** `/projects` sayfasındaki `h2` sayısı ≥ (proje sayısı − 2) = **18**.
> Kart başlıkları **`h2` olarak kalmalı** (semantik olarak da doğru: `h1` = sayfa başlığı,
> `h2` = bölüm/kart). TEST_15 "All" buton metnini, TEST_17 ≥3 buton sayısını korur.

### 4.4 `components/contact/contact-form.tsx` — Durumlar & inline doğrulama (§16)

1. **Inline doğrulama:** alan `blur`'da doğrulanır; hata mesajı alanın altında
   `aria-live="polite"` ile belirir (submit beklemeden).
2. **Odak halkası:** `focus-visible` → 2px `foreground` halka + 2px offset.
3. **Gönder butonu:** `whileTap={{ scale: 0.97 }}`; `sending` durumunda metin değişmez,
   solda **spring'li spinner**, `aria-busy="true"`.
4. **Layout shift yok:** durum değişiminde sabit `min-width`.
5. Başarı/hata mesajı **spring'le** yükselerek girer (`opacity + y 8px→0`).
6. `autocomplete="name"` / `autocomplete="email"`? (formda e-posta alanı yok; istenirse
   eklenir) ve `name`/`id` eşleşmeleri tamamlanır.

### 4.5 `src/app/page.tsx` — Hero & bölüm ritmi (§8, §15, §16)

1. **Hero hiyerarşisi:** etiket → **ad** (display) → **rol satırı** → tek cümlelik tanım.
   Apple "Net" ilkesi: tek ana mesaj.
2. **Tek birincil eylem:** `View Projects` → koyu dolgu buton (`bg-foreground text-background`);
   `Contact` → metin buton. İki eşit altı çizgili link yerine net hiyerarşi.
3. **Scroll reveal:** bölümler `IntersectionObserver` ile girince
   `opacity 0→1 + translateY(16px→0)` (**spring.standard**). Reduced-motion'da anında.
4. **Hero mikro hareket:** scroll'a bağlı çok hafif `translateY`/`opacity` (paralaks değil).
5. **Bölüm ritmi:** `py-24` → `py-28 md:py-36`; `border-t border-border` → `border-hairline`.
6. **Experience satırları:** hover'da ince arka plan (`bg-surface/50 rounded-xl`), padding
   değişimi olmadan.

> ⚠️ **TEST_13 kısıtı:** Ana sayfadaki proje başlıkları **`h3` olarak kalmalı**
> (`#projects h3` → 1–6 arası). TEST_31/36/37 için `flex-col`, `md:flex-row`, `px-6`,
> `md:px-24` ve h1'de `text-5xl` + `md:text-` korunur.

### 4.6 `src/app/resume/resume-client.tsx` — Selector + print sertliği

1. Başlık seçici (4 seçenek) → **segmented control** (`layoutId` kayan pill).
2. Seçim değişince CV içeriği **cross-fade** (`AnimatePresence`, `mode="wait"`);
   print'te **statik** kalmalı.
3. **ATS uyumu korunur:** her motion sarmalayıcısı → `print:hidden` ya da
   `print:opacity-100! print:transform-none!` (Tailwind v4 important sondadır);
   `print:break-inside-avoid` bölümlerde kalır; `print:bg-white`/`print:text-black` korunur.
4. `window.print()` butonu → anlık basınç geri bildirimi + `aria-live` "Preparing PDF…".

> ⚠️ **TEST_47 kısıtı:** `/resume` gövdesinde **`canvas` kelimesi** geçerse test
> `print:hidden` arar. Metin/alt metin içinde "canvas" kelimesi kullanılmamalı.
> TEST_42/46/48/50 (`print:`, `break-inside-avoid`, `print:text-`, `print:bg-white`)
> korunur.

### 4.7 `components/Footer.tsx` — Sade bitti

Değişiklik minimal: `pressable` + `:focus-visible` halkası, `print:hidden` korunur,
`footer a[href*="github.com"]` **tam href** eşleşmesi korunur (TEST_21/22/23/24/55).

---

## 5. Erişilebilirlik Kontrol Listesi

| Kontrol | Uygulama |
|---|---|
| `prefers-reduced-motion` | Global guard + Motion `useReducedMotion()` → cross-fade |
| `prefers-reduced-transparency` | Materyal opaklaşır, blur kapanır |
| `prefers-contrast: more` | Opak yüzey + belirgin kenar |
| Klavye | `Escape` sheet'i kapatır, focus trap, `:focus-visible` halkası, **skip link** |
| Ekran okuyucu | `aria-modal`, `aria-current="page"`, `aria-expanded`, `aria-busy`, `aria-live` |
| Form | `aria-invalid`, `aria-describedby` ile hata bağlantısı |
| Dokunma hedefi | Min 44×44 px (filter butonları `py-2 px-3` ile büyütülür) |
| Metin seçimi | Mevcut ters seçim korunur |

---

## 6. Test Sözleşmeleri (Koruma Matrisi — `scripts/run-e2e.js`, 60 test)

`run-e2e.js` kaba bir DOM parser kullanır. Revizyon boyunca aşağıdaki literal'ler
**kaldırılmamalı**:

| Test | Korunacak literal / koşul |
|---|---|
| TEST_05, TEST_51 | `header nav a` ≥ 2 · `header a` **ilk** = logo `href="/"` |
| TEST_14 | `/projects` → `h2` sayısı ≥ 18 (kart başlıkları `h2` olmalı) |
| TEST_15, TEST_17 | Filtre buton metninde **"All"** · buton sayısı ≥ 3 |
| TEST_13 | `/` → `#projects h3` 1–6 arası (kart başlıkları `h3`) |
| TEST_26, TEST_27 | Harici linklerde `target="_blank"` **ve** `rel="noopener noreferrer"` |
| TEST_31, TEST_36, TEST_38 | Gövdede `flex-col` + `md:flex-row` · `px-6` + `md:px-24` |
| TEST_32 | `header nav` → `hidden md:block` |
| TEST_33 | `/projects` → `md:col-span-9` + `md:col-span-3` |
| TEST_34 | `/contact` → `grid-cols-1` + `md:grid-cols-2` |
| TEST_37 | `/` `h1` → **`text-5xl`** + **`md:text-`** |
| TEST_39, TEST_59 | `header button` → **`md:hidden`** (ilk buton hamburger olmalı — B-3) |
| TEST_40, TEST_49 | Gövdede `flex-wrap` |
| TEST_42–50 | `print:hidden` · `print:font-sans` · `print:break-inside-avoid` · `print:text-black` · `print:bg-white` · **"canvas" kelimesi yok** |
| TEST_56 | `form input[type="text"]` + `form textarea` + `<form>` korunur |
| TEST_52/53/58 | **Bilinen başarısızlıklar — dokunulmaz** (ürün kararı, tasarım değil) |

**Önerilen yeni testler** (`scripts/run-e2e.js` içine, "Accessibility" feature grubu):
- `globals.css` içinde `prefers-reduced-motion` geçiyor mu?
- Header'da `backdrop-filter` materyal sınıfı var mı?
- Filtre butonu `aria-pressed` taşıyor mu?
- `/` gövdesinde `prefers-reduced-motion` guard'ı var mı?

---

## 7. Uygulama Sırası (Fazlar — her biri ayrı PR)

| Faz | İçerik | Tahmini | Bağımlılık |
|---|---|---|---|
| **0 — Baseline** | E2E çalıştır, ekran görüntüleri, Lighthouse, `pnpm lint` | 0.5 g | — |
| **1 — Katman & token düzeltmesi** | `@layer base` düzeltmesi (B-1), token seti, tipografi ölçeği, reduced-motion/transparency/contrast guard | 1 g | — |
| **2 — Basınç + odak geri bildirimi** | `.pressable`, `.focus-ring`, skip link, tüm yüzeylerde `whileTap`/`active` | 0.5 g | Faz 1 |
| **3 — Header materyal + aktif rota** | `scroll-state.tsx`, materyal, kayma kenarı, `nav-links` client adacığı + `layoutId` pill | 1 g | Faz 1, 2 |
| **4 — Mobil sheet** | Sheet + drag-to-dismiss + velocity handoff + rubberband + focus trap + Escape | 1.5 g | Faz 1, 2 |
| **5 — Projeler** | Segmented control, kart materyali, FLIP filtre geçişi, sayaç animasyonu | 1.5 g | Faz 1, 2 |
| **6 — İletişim formu** | Inline doğrulama, spring durum geçişleri, spinner, layout-shift koruması | 1 g | Faz 1, 2 |
| **7 — Ana sayfa** | Hero hiyerarşisi, CTA'lar, scroll reveal, bölüm ritmi | 1 g | Faz 2 |
| **8 — Resume** | Segmented başlık seçici, print sertleştirme | 0.5 g | Faz 1, 5 |
| **9 — Kalite turu** | A11y taraması, reduced-motion görsel kontrol, print PDF kontrolü, Lighthouse, E2E | 1 g | Tümü |
| **10 — Opsiyonel** | Dark mode (token çifti + `prefers-color-scheme`), `prefers-contrast` cilası | 1 g | Tümü |

> Toplu bir "design overhaul" PR'i review edilemez. Her faz bağımsız PR + E2E.

---

## 8. Riskler & Önlemler

| Risk | Etki | Önlem |
|---|---|---|
| `motion` bundle'ı (~18 KB gzip, tüm ağaç) | Performans | `LazyMotion` + `m` + `domAnimation` (~5 KB gzip) → `next build` çıktısında ölç; yalnız 4+3 adacıkta kullan |
| CSS `transition` ile Motion çakışması | Görsel "jump" | Motion kullanan yüzeylerde CSS transition **yok** (§3 kuralı) |
| Layer hatasının fark edilmemesi | Renk/tracking sessizce bozulur | Faz 1 sonrası görsel diff + `tracking-widest`/`text-foreground\/80` kontrolü |
| Motion sarmalayıcılarının print'e sızması | ATS CV bozulur | `print:hidden` veya `print:opacity-100! print:transform-none!` (B-4) |
| `run-e2e.js` parser'ının derin DOM'u çözememesi | Yanlış negatif test | Sorgulanan sınıfları **literal** bırak; yeni sarmalayıcılarda `display:contents` gerekebilir |
| Header'a eklenen butonun ilk buton olması | TEST_39/59 kırılır | DOM sırası kuralı (B-3) |
| Aşırı animasyon "yavasa vitrini" etkisi | Marka tonu kaybı | Sakin ton korunur: spring 0.2–0.4 s, overshoot **yalnız** fırlatmada |
| `backdrop-filter` maliyeti (mobil) | Jank | Blur yalnız header/sheet'te; kartlarda opak `surface` tercih edilebilir; `will-change` yalnız animasyon anında |

---

## 9. Başarı Ölçütleri

- [ ] Lighthouse Performance ≥ 95, CLS = 0 (layout değişmeden)
- [ ] `pnpm test:e2e` → **yeni başarısız test yok** (mevcut 3 bilinen başarısızlık hariç)
- [ ] `pnpm lint` ve `tsc --noEmit` temiz (build TypeScript hatalarını gizliyor!)
- [ ] Tüm etkileşimli yüzeylerde pointer-down geri bildirimi
- [ ] Reduced-motion modunda hiçbir transform/slide yok, sadece cross-fade
- [ ] Mobil sheet **sürüklenerek** kapatılabiliyor ve **fırlatılabiliyor**
- [ ] `/resume` PDF çıktısı ATS uyumlu (TEST_42–50 + manuel PDF kontrolü)
- [ ] Header'da aktif rota belli, scroll'da materyal "kalınlaşıyor"
- [ ] `p` / `a` / `h*` element kuralları içerik seviyesi kararları ezmiyor (B-1)

---

## 10. Alınan Kararlar

| Karar | Seçim | Sonuç |
|---|---|---|
| Hareket kütüphanesi | **`motion`** (Framer Motion) | `pnpm add motion`; `LazyMotion` + `m` + `domAnimation` (~5 KB gzip) |
| Görsel dil | **Hibrit** | Quiet Luxury paleti korunur; CTA dolgusu + kart materyali + segment + spring'li sheet eklenir |
| Karanlık mod | **Ertelendi** | Faz 10'a bırakılır; bu turda token çifti *yok* |
| Scroll reveal | **Yalnız ana sayfa** | `/projects`, `/contact`, `/resume` statik kalır |

**Uygulama notları (kararlardan türeyen):**
- `motion` yalnız **7 adacıkta** kullanılır: mevcut 4 (`mobile-menu`, `projects-grid`,
  `contact-form`, `resume-client`) + yeni 3 (`header/scroll-state`, `header/nav-links`,
  `reveal`). Sayfa gövdeleri ve footer RSC kalır.
- `reveal` adacığı **sadece `src/app/page.tsx`**'de kullanılır; başka route'larda
  import edilmez (bundle bölünmesi olmasın).
- `LazyMotion` sarmalayıcısı **layout seviyesinde bir kez** (`src/app/layout.tsx` içine
  client sarmalayıcı) kurulur → `domAnimation` özelliği tek sefer yüklenir.

---

## 11. Uygulama Durumu (tamamlandı)

Faz 1–9 uygulandı. Ölçüm: `pnpm lint` temiz, `tsc --noEmit` temiz, `pnpm build` başarılı,
`pnpm test:e2e` → **57 PASS / 3 FAIL** (yalnız bilinen TEST_52, TEST_53, TEST_58).

| Faz | Durum | Not |
|---|---|---|
| 1 — Katman & token | ✅ | `p`/`a`/`h*`/`html`/`body`/`:focus-visible`/`::selection` → `@layer base`; yeni token'lar (`hairline`, `scrim`, `shadow-*`, `ease-apple*`) |
| 2 — Basınç & odak | ✅ | `.pressable` (`scale(.97)` on `:active`) tüm link/butonlarda; global `:focus-visible` 2px ink outline |
| 3 — Header materyali | ✅ | `.site-header` (blur + doygunluk), `html[data-scrolled]` ile kalınlaşma, `::after` kayma kenarı, aktif rota pill'i |
| 4 — Mobil sheet | ✅ | Portal, `transform-origin: top right`, `drag="y"` + görünür alan sınırı, velocity handoff, Escape, focus trap/restore, `aria-modal` |
| 5 — Projeler | ✅ | Dikey segmented filtre (`layoutId` pill), sticky sidebar, 2 kolon kart grid, kademeli giriş, `aria-live` sayaç |
| 6 — İletişim formu | ✅ | Blur'da inline doğrulama, `aria-invalid`/`aria-describedby`, `aria-busy` + spinner, sabit buton genişliği, `aria-live` durum |
| 7 — Ana sayfa | ✅ | Etiket → isim → rol → giriş hiyerarşisi, dolu birincil CTA, `<dl>` meta, kart grid, deneyim satırları, `Reveal` |
| 8 — Resume | ✅ | Segmented başlık seçici, `print:` sertleştirme, **içerik animasyonu yok** (print güvenliği) |
| 9 — QA | ✅ | lint + tsc + build + e2e |
| 10 — Karanlık mod | ⏸ | Bilinçli olarak ertelendi |

**Plandan sapan üç teknik karar:**
1. `domAnimation` yerine **`domMax`** kullanıldı — `drag` ve `layoutId` `domAnimation`'da yok.
   Turbopack `domMax`'i ayrı chunk'a bölmediği için `LazyMotion` sarmalayıcısı sadeleştirildi
   (davranış aynı, gereksiz dinamik import kaldırıldı).
2. `reveal` state yerine **DOM attribute** (`data-reveal`) ile sürülüyor: React Compiler'ın
   `set-state-in-effect` kuralına takılmıyor, yeniden render maliyeti yok ve JS'siz durumda
   içerik görünür kalıyor.
3. `/resume` içeriğinde geçiş animasyonu **yok**: print sırasında yakalanan bir opacity
   animasyonu CV'yi soluk basabilir. Yalnız seçici pill'i animasyonlu.

**Ölçülen maliyet:** ilk JS ~231 KB gzip (motion payı ~45 KB gzip). `will-change`
kaldırıldı, DM Sans tek değişken font dosyasına indirildi (4 statik ağırlık yerine).

