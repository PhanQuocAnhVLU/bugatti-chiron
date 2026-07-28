/* =============================================
   CAR-SVG.JS
   Original hand-drawn hypercar artwork (side / front / rear).
   No photographs used — every panel is a vector shape, so the
   selected paint colour is applied as an exact fill, never a
   photo-tint approximation. Free of any third-party copyright.

   Each builder returns a self-contained <svg> string. `suffix` is
   used to namespace internal ids (gradients/filters) so the main
   showcase copy and the reflected floor copy never collide.
   ============================================= */

(function (global) {

  function sheenDefs(id) {
    return (
      '<linearGradient id="sheen-' + id + '" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#ffffff" stop-opacity="0.5"/>' +
        '<stop offset="0.4" stop-color="#ffffff" stop-opacity="0.05"/>' +
        '<stop offset="1" stop-color="#ffffff" stop-opacity="0"/>' +
      '</linearGradient>'
    );
  }

  function wheel(cx, cy, r) {
    return (
      '<g class="wheel">' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#101216"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.6) + '" fill="#2b2f36"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.6) + '" fill="none" stroke="#484e57" stroke-width="1.5"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.17) + '" fill="#6b7078"/>' +
      '</g>'
    );
  }

  function buildSideSVG(suffix) {
    var id = 'side-' + suffix;
    return (
      '<svg viewBox="0 0 880 300" xmlns="http://www.w3.org/2000/svg" class="chiron-svg chiron-svg-side">' +
        '<defs>' + sheenDefs(id) + '</defs>' +

        '<ellipse cx="440" cy="286" rx="380" ry="13" fill="#000" opacity="0.38"/>' +

        wheel(190, 252, 46) +
        wheel(650, 252, 46) +

        /* interior — sits underneath the door, revealed when it opens */
        '<g class="interior-fill">' +
          '<path d="M366 232 L366 150 Q430 132 520 130 L548 230 Z" fill="#171a20"/>' +
          '<path d="M382 210 Q420 190 470 188 L470 208 Q425 210 390 222 Z" fill="#232730"/>' +
        '</g>' +

        /* main body silhouette — painted */
        '<path data-paint="body" d="M60 238 Q42 238 42 216 Q42 196 66 187 L128 176 Q168 120 258 100 L358 95 Q398 60 468 58 L558 60 Q628 63 668 96 L726 120 Q788 130 818 165 Q838 190 828 214 Q822 232 798 236 Z"/>' +

        /* glass canopy — fixed colour, not painted */
        '<path d="M150 178 Q188 138 260 120 L358 116 Q398 92 468 90 L556 92 Q612 96 648 120 L698 150 Q676 166 646 172 L500 178 L300 180 Z" fill="#0b1622" opacity="0.94"/>' +

        /* door — painted, hinged at top-front corner, swings open */
        '<g class="door-panel">' +
          '<path data-paint="body" d="M362 236 L362 118 Q400 96 468 94 L556 96 L556 236 Z"/>' +
          '<rect x="452" y="158" width="28" height="7" rx="3.5" fill="#171a20"/>' +
        '</g>' +

        /* side mirror */
        '<path d="M330 152 L352 146 L356 160 L336 164 Z" fill="#14171c"/>' +

        /* lamps */
        '<ellipse cx="80" cy="196" rx="13" ry="9" fill="#d7e2ee"/>' +
        '<rect x="800" y="190" width="17" height="26" rx="4" fill="#7a1015"/>' +

        /* character line + sheen */
        '<path d="M130 178 Q400 150 726 122" fill="none" stroke="#ffffff" stroke-opacity="0.10" stroke-width="1.5"/>' +
        '<path d="M258 100 L358 95 Q398 60 468 58 L558 60 Q628 63 668 96" fill="none" stroke="url(#sheen-' + id + ')" stroke-width="6" opacity="0.5"/>' +
      '</svg>'
    );
  }

  function headlightGroup(cx, mirror) {
    var dx = mirror ? -1 : 1;
    var hx1 = cx - dx * 45, hx2 = cx + dx * 45;
    return (
      '<g class="headlight-front">' +
        '<path d="M' + hx1 + ' 165 L' + hx2 + ' 160 Q' + (hx2 + dx * 10) + ' 185 ' + hx2 + ' 215 L' + hx1 + ' 220 Q' + (hx1 - dx * 10) + ' 195 ' + hx1 + ' 165 Z" fill="#161a20"/>' +
        '<ellipse class="headlight-lens" cx="' + cx + '" cy="190" rx="24" ry="15" fill="#3a3f4a"/>' +
        '<path class="headlight-beam" d="M' + cx + ' 190 L' + (cx - dx * 90) + ' 270 L' + (cx - dx * 90) + ' 330 L' + (cx + dx * 20) + ' 235 Z" fill="#dff0ff"/>' +
      '</g>'
    );
  }

  function buildFrontSVG(suffix) {
    var id = 'front-' + suffix;
    return (
      '<svg viewBox="0 0 640 380" xmlns="http://www.w3.org/2000/svg" class="chiron-svg chiron-svg-front">' +
        '<defs>' + sheenDefs(id) + '</defs>' +

        '<ellipse cx="320" cy="328" rx="260" ry="15" fill="#000" opacity="0.38"/>' +

        wheel(95, 300, 54) +
        wheel(545, 300, 54) +

        '<path data-paint="body" d="M90 340 Q68 340 66 300 L74 224 Q92 150 190 118 L450 118 Q548 150 566 224 L574 300 Q572 340 550 340 Z"/>' +

        /* grille mesh */
        '<path d="M250 232 L390 232 L400 300 L240 300 Z" fill="#0c0d10"/>' +
        '<line x1="248" y1="252" x2="396" y2="252" stroke="#252932" stroke-width="2"/>' +
        '<line x1="246" y1="272" x2="398" y2="272" stroke="#252932" stroke-width="2"/>' +
        '<line x1="243" y1="292" x2="399" y2="292" stroke="#252932" stroke-width="2"/>' +

        /* splitter */
        '<rect x="185" y="300" width="270" height="8" rx="2" fill="#b0bec5" opacity="0.55"/>' +

        headlightGroup(150, false) +
        headlightGroup(490, true) +

        '<path d="M190 122 Q320 104 450 122" fill="none" stroke="url(#sheen-' + id + ')" stroke-width="8" opacity="0.55"/>' +
      '</svg>'
    );
  }

  function buildRearSVG(suffix) {
    var id = 'rear-' + suffix;
    return (
      '<svg viewBox="0 0 640 380" xmlns="http://www.w3.org/2000/svg" class="chiron-svg chiron-svg-rear">' +
        '<defs>' +
          sheenDefs(id) +
          '<filter id="glow-' + id + '" x="-60%" y="-60%" width="220%" height="220%">' +
            '<feGaussianBlur stdDeviation="5" result="b"/>' +
            '<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>' +
          '</filter>' +
        '</defs>' +

        '<ellipse cx="320" cy="328" rx="260" ry="15" fill="#000" opacity="0.38"/>' +

        wheel(95, 300, 54) +
        wheel(545, 300, 54) +

        /* engine bay — underneath the cover, revealed when it lifts */
        '<g class="engine-bay-detail">' +
          '<rect x="210" y="168" width="220" height="60" rx="6" fill="#14171d"/>' +
          '<circle cx="250" cy="196" r="16" fill="#2a2e36"/>' +
          '<circle cx="320" cy="196" r="16" fill="#2a2e36"/>' +
          '<circle cx="390" cy="196" r="16" fill="#2a2e36"/>' +
          '<line x1="220" y1="230" x2="220" y2="210" stroke="#3a3f4a" stroke-width="4"/>' +
          '<line x1="420" y1="230" x2="420" y2="210" stroke="#3a3f4a" stroke-width="4"/>' +
        '</g>' +

        '<path data-paint="body" d="M90 340 Q68 340 66 300 L74 230 Q90 165 180 140 L460 140 Q550 165 566 230 L574 300 Q572 340 550 340 Z"/>' +

        /* deck lid / engine cover — painted, lifts to reveal the bay */
        '<g class="engine-cover">' +
          '<path data-paint="body" d="M172 236 L468 236 L448 150 L192 150 Z"/>' +
        '</g>' +

        /* taillight bar — softly lit */
        '<rect x="150" y="150" width="340" height="16" rx="7" fill="#9c1017" filter="url(#glow-' + id + ')"/>' +

        /* diffuser fins */
        '<path d="M260 300 L280 330 L300 300 Z" fill="#101216"/>' +
        '<path d="M340 300 L360 330 L380 300 Z" fill="#101216"/>' +

        '<path d="M180 144 Q320 128 460 144" fill="none" stroke="url(#sheen-' + id + ')" stroke-width="8" opacity="0.5"/>' +
      '</svg>'
    );
  }

  global.CarSVG = {
    build: function (view, suffix) {
      if (view === 'front') return buildFrontSVG(suffix);
      if (view === 'rear') return buildRearSVG(suffix);
      return buildSideSVG(suffix);
    }
  };

})(window);
