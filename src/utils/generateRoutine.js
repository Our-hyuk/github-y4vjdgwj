import { STRINGS, KEY_PITCH, SCALES, FIXED_DEGREE_BY_PITCH, TEMPO_HINTS } from '../data/scaleTheory';

const PLAY_ORDER = [5, 4, 3, 2, 1, 0];

const SHAPES = [
  { key: 'ascending', label: '정방향 (저음현 → 고음현)' },
  { key: 'zigzag', label: '지그재그 (현마다 방향 전환)' },
  { key: 'roundtrip', label: '왕복 (올라갔다 내려오기)' },
];

function findCandidates(key, scaleName, boxStart) {
  const root = KEY_PITCH[key];
  const scale = SCALES[scaleName];
  const scalePitches = scale.offsets.map((o) => (root + o) % 12);

  return STRINGS.map((s, stringIdx) => {
    const notes = [];
    for (let fret = boxStart; fret <= boxStart + 4; fret++) {
      const pitch = (s.open + fret) % 12;
      const pos = scalePitches.indexOf(pitch);
      if (pos !== -1) {
        notes.push({
          string: stringIdx,
          fret,
          movableDeg: scale.degrees[pos],
          fixedDeg: FIXED_DEGREE_BY_PITCH[pitch],
        });
      }
    }
    return notes;
  });
}

function buildSequence(candidatesByString, shapeKey) {
  const seq = [];
  if (shapeKey === 'zigzag') {
    PLAY_ORDER.forEach((stringIdx, i) => {
      const notes = candidatesByString[stringIdx];
      const ordered = i % 2 === 0 ? notes : [...notes].reverse();
      seq.push(...ordered);
    });
  } else if (shapeKey === 'roundtrip') {
    PLAY_ORDER.forEach((stringIdx) => seq.push(...candidatesByString[stringIdx]));
    const back = [...seq].reverse().slice(1);
    seq.push(...back);
  } else {
    PLAY_ORDER.forEach((stringIdx) => seq.push(...candidatesByString[stringIdx]));
  }
  return seq;
}

export function generateLeftHandRoutine({ key, scaleName, difficulty }) {
  const boxStart = Math.floor(Math.random() * 8);
  const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
  const candidates = findCandidates(key, scaleName, boxStart);
  const sequence = buildSequence(candidates, shape.key);

  return {
    key,
    scaleName,
    boxStart,
    boxEnd: boxStart + 4,
    shapeLabel: shape.label,
    tempoHint: TEMPO_HINTS[difficulty] || TEMPO_HINTS['보통'],
    sequence,
  };
}