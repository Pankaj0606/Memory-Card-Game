# 🧠 FlipMatch — Memory Card Game

An interactive, responsive 3D card-matching memory game built with **HTML5, Modern CSS3 (3D transforms & animations), and Vanilla JavaScript**.

---

## 🎮 Game Rules & Mechanics

1. Click any card to reveal its hidden symbol.
2. Click a second card to find its pair.
   - **Match:** Both cards turn green and stay revealed.
   - **Mismatch:** Both cards shake with a subtle red highlight and flip back face-down after 0.9 seconds.
3. **🔥 Hardcore Mode:** A high-stakes difficulty mode where committing a single mismatch resets **all** previously matched pairs back to face-down!
4. **Victory:** Match all 8 pairs (16 cards total) in the fewest moves and fastest time.

---

## 🛠️ Tech Highlights

- **Pure 3D Card-Flip Animation:** Implemented with `perspective: 1000px`, `transform-style: preserve-3d`, and `backface-visibility: hidden`.
- **Fisher-Yates Shuffle Algorithm:** Guarantees unbiased randomized card placement on every game start.
- **Click-Lock State Machine:** Prevents user spam/multi-clicking during transition intervals.
- **Zero External Dependencies:** Built with pure Vanilla JS and CSS variables for high performance.

---

## 🚀 How to Run Locally

Clone the repository and open `index.html` in any browser:

```bash
git clone https://github.com/Pankaj0606/Memory-Card-Game.git
cd Memory-Card-Game
open index.html