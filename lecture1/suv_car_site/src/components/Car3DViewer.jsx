import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, RoundedBox, ContactShadows, Text } from '@react-three/drei'

// 모델별 차체 치수
const CONFIGS = [
  { // Pinnacle VII — 장축 럭셔리 SUV
    bodyL:4.20, bodyH:0.70, bodyW:1.80,
    cabinL:2.55, cabinH:0.72, cabinW:1.70, cabinX:-0.12,
    axleF:1.28, axleR:-1.28, sunroof:true,
  },
  { // Summit V — 박스형 오프로더
    bodyL:3.85, bodyH:0.90, bodyW:1.90,
    cabinL:3.15, cabinH:0.90, cabinW:1.80, cabinX:0,
    axleF:1.18, axleR:-1.18, sunroof:false,
  },
  { // Apex S — 쿠페형 스포티 SUV
    bodyL:4.05, bodyH:0.68, bodyW:1.76,
    cabinL:2.18, cabinH:0.65, cabinW:1.63, cabinX:-0.24,
    axleF:1.30, axleR:-1.30, sunroof:true,
  },
  { // Crest EV — 현대적 전기 SUV
    bodyL:4.00, bodyH:0.76, bodyW:1.82,
    cabinL:2.75, cabinH:0.72, cabinW:1.72, cabinX:-0.05,
    axleF:1.26, axleR:-1.26, sunroof:true,
  },
]

const WR = 0.38  // wheel radius
const WW = 0.27  // wheel width

function Wheel({ position, wheelId }) {
  const sc = wheelId==='w23_lux' ? '#C8A458'
    : wheelId==='w22_sport' ? '#d0d0d0' : '#909090'
  const n = wheelId==='w23_lux' ? 8
    : wheelId==='w22_sport' ? 6
    : wheelId==='w21_classic' ? 5 : 4

  return (
    <group position={position}>
      <group rotation={[Math.PI/2, 0, 0]}>
        {/* 타이어 */}
        <mesh>
          <cylinderGeometry args={[WR, WR, WW, 32]} />
          <meshStandardMaterial color="#111" roughness={0.9} metalness={0.05}/>
        </mesh>
        {/* 타이어 사이드월 */}
        <mesh rotation={[Math.PI/2, 0, 0]}>
          <torusGeometry args={[WR-0.015, 0.012, 8, 32]}/>
          <meshStandardMaterial color="#292929" roughness={0.9}/>
        </mesh>
        {/* 림 */}
        <mesh>
          <cylinderGeometry args={[0.27, 0.27, WW+0.02, 32]}/>
          <meshStandardMaterial color="#888" metalness={0.85} roughness={0.15}/>
        </mesh>
        {/* 스포크 */}
        {Array.from({length:n}, (_,i) => {
          const a = (i/n)*Math.PI*2
          return (
            <group key={i} rotation={[0,0,a]}>
              <mesh position={[0, 0.17, 0]}>
                <boxGeometry args={[0.028, 0.20, WW-0.02]}/>
                <meshStandardMaterial color={sc} metalness={0.9} roughness={0.1}/>
              </mesh>
            </group>
          )
        })}
        {/* 허브 */}
        <mesh>
          <cylinderGeometry args={[0.056, 0.056, WW+0.04, 16]}/>
          <meshStandardMaterial color={sc} metalness={0.95} roughness={0.05}/>
        </mesh>
      </group>
    </group>
  )
}

function CarModel({ modelIndex, colorHex, wheelId, monogram }) {
  const c = CONFIGS[modelIndex]
  const bBotY = WR
  const bCtrY = bBotY + c.bodyH/2
  const cabBotY = bBotY + c.bodyH - 0.06
  const cabCtrY = cabBotY + c.cabinH/2
  const trackZ = c.bodyW/2 + WW/2 + 0.025

  return (
    <group>
      {/* ── 차체 하단 ── */}
      <RoundedBox args={[c.bodyL, c.bodyH, c.bodyW]} radius={0.07} smoothness={3} position={[0, bCtrY, 0]}>
        <meshStandardMaterial color={colorHex} metalness={0.42} roughness={0.33} envMapIntensity={1.2}/>
      </RoundedBox>

      {/* ── 캐빈 ── */}
      <RoundedBox args={[c.cabinL, c.cabinH, c.cabinW-0.04]} radius={0.10} smoothness={3} position={[c.cabinX, cabCtrY, 0]}>
        <meshStandardMaterial color={colorHex} metalness={0.42} roughness={0.33} envMapIntensity={1.2}/>
      </RoundedBox>

      {/* ── 유리 ── */}
      {/* 측면 좌 */}
      <mesh position={[c.cabinX, cabCtrY, c.cabinW/2-0.012]}>
        <planeGeometry args={[c.cabinL-0.30, c.cabinH-0.12]}/>
        <meshStandardMaterial color="#90c0e0" transparent opacity={0.30} metalness={0.05} roughness={0.05}/>
      </mesh>
      {/* 측면 우 */}
      <mesh position={[c.cabinX, cabCtrY, -(c.cabinW/2-0.012)]} rotation={[0,Math.PI,0]}>
        <planeGeometry args={[c.cabinL-0.30, c.cabinH-0.12]}/>
        <meshStandardMaterial color="#90c0e0" transparent opacity={0.30} metalness={0.05} roughness={0.05}/>
      </mesh>
      {/* 앞 유리 */}
      <mesh position={[c.cabinX+c.cabinL/2-0.035, cabCtrY, 0]} rotation={[0,Math.PI/2,0]}>
        <planeGeometry args={[c.cabinW-0.14, c.cabinH-0.09]}/>
        <meshStandardMaterial color="#90c0e0" transparent opacity={0.28} metalness={0.05} roughness={0.05}/>
      </mesh>
      {/* 뒷 유리 */}
      <mesh position={[c.cabinX-c.cabinL/2+0.035, cabCtrY, 0]} rotation={[0,-Math.PI/2,0]}>
        <planeGeometry args={[c.cabinW-0.14, c.cabinH-0.09]}/>
        <meshStandardMaterial color="#90c0e0" transparent opacity={0.28} metalness={0.05} roughness={0.05}/>
      </mesh>
      {/* 선루프 */}
      {c.sunroof && (
        <mesh position={[c.cabinX, cabCtrY+c.cabinH/2+0.001, 0]} rotation={[-Math.PI/2,0,0]}>
          <planeGeometry args={[c.cabinL*0.52, c.cabinW-0.26]}/>
          <meshStandardMaterial color="#4488aa" transparent opacity={0.40}/>
        </mesh>
      )}

      {/* ── 앞 헤드라이트 ── */}
      {[-1,1].map(s=>(
        <group key={s}>
          <mesh position={[c.bodyL/2+0.006, bCtrY+0.09, s*0.50]}>
            <boxGeometry args={[0.014, 0.10, 0.28]}/>
            <meshStandardMaterial color="#fffde8" emissive="#fffab0" emissiveIntensity={0.7}/>
          </mesh>
        </group>
      ))}
      {/* DRL 가로줄 */}
      <mesh position={[c.bodyL/2+0.006, bCtrY+0.16, 0]}>
        <boxGeometry args={[0.014, 0.022, 0.86]}/>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.2}/>
      </mesh>

      {/* ── 뒤 테일라이트 ── */}
      {[-1,1].map(s=>(
        <mesh key={s} position={[-c.bodyL/2-0.006, bCtrY+0.09, s*0.50]}>
          <boxGeometry args={[0.014, 0.10, 0.30]}/>
          <meshStandardMaterial color="#ff2222" emissive="#cc0000" emissiveIntensity={1.6}/>
        </mesh>
      ))}
      {/* 테일 LED 바 */}
      <mesh position={[-c.bodyL/2-0.006, bCtrY+0.16, 0]}>
        <boxGeometry args={[0.014, 0.018, 0.84]}/>
        <meshStandardMaterial color="#ff4444" emissive="#ff2222" emissiveIntensity={1.4}/>
      </mesh>

      {/* ── 앞 범퍼 그릴 ── */}
      <mesh position={[c.bodyL/2+0.006, bCtrY-0.14, 0]}>
        <boxGeometry args={[0.014, 0.22, 0.72]}/>
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.5}/>
      </mesh>

      {/* ── 크롬 트림 ── */}
      <mesh position={[c.bodyL/2+0.006, bCtrY+0.19, 0]}>
        <boxGeometry args={[0.010, 0.013, c.bodyW*0.92]}/>
        <meshStandardMaterial color="#e0e0e0" metalness={0.95} roughness={0.04}/>
      </mesh>
      <mesh position={[-c.bodyL/2-0.006, bCtrY+0.19, 0]}>
        <boxGeometry args={[0.010, 0.013, c.bodyW*0.92]}/>
        <meshStandardMaterial color="#e0e0e0" metalness={0.95} roughness={0.04}/>
      </mesh>
      {/* 윈도우 크롬 프레임 */}
      <mesh position={[c.cabinX, cabCtrY, c.cabinW/2-0.008]}>
        <boxGeometry args={[c.cabinL-0.04, 0.013, 0.008]}/>
        <meshStandardMaterial color="#d8d8d8" metalness={0.95} roughness={0.04}/>
      </mesh>
      <mesh position={[c.cabinX, cabCtrY, -(c.cabinW/2-0.008)]}>
        <boxGeometry args={[c.cabinL-0.04, 0.013, 0.008]}/>
        <meshStandardMaterial color="#d8d8d8" metalness={0.95} roughness={0.04}/>
      </mesh>

      {/* ── 사이드 스커트 ── */}
      <mesh position={[0, bBotY+0.04, c.bodyW/2+0.006]}>
        <boxGeometry args={[c.bodyL-0.15, 0.07, 0.014]}/>
        <meshStandardMaterial color="#222" metalness={0.3} roughness={0.7}/>
      </mesh>
      <mesh position={[0, bBotY+0.04, -(c.bodyW/2+0.006)]}>
        <boxGeometry args={[c.bodyL-0.15, 0.07, 0.014]}/>
        <meshStandardMaterial color="#222" metalness={0.3} roughness={0.7}/>
      </mesh>

      {/* ── 배기구 ── */}
      {[-1,1].map(s=>(
        <mesh key={s} position={[-c.bodyL/2-0.012, bBotY+0.07, s*0.36]} rotation={[0,Math.PI/2,0]}>
          <cylinderGeometry args={[0.038,0.038,0.035,12]}/>
          <meshStandardMaterial color="#555" metalness={0.7} roughness={0.4}/>
        </mesh>
      ))}

      {/* ── VANTAGE 로고 (후면) ── */}
      <Text
        position={[-c.bodyL/2-0.018, bCtrY+0.12, 0]}
        rotation={[0,-Math.PI/2,0]}
        fontSize={0.055}
        color="#A68966"
        letterSpacing={0.14}
        anchorX="center"
        anchorY="middle"
      >
        VANTAGE
      </Text>

      {/* ── 이니셜 각인 ── */}
      {monogram && (
        <Text
          position={[-c.bodyL/2-0.018, bCtrY-0.04, 0]}
          rotation={[0,-Math.PI/2,0]}
          fontSize={0.072}
          color="#A68966"
          letterSpacing={0.10}
          anchorX="center"
          anchorY="middle"
        >
          {monogram}
        </Text>
      )}

      {/* ── 휠 4개 ── */}
      {[
        [c.axleF, WR,  trackZ],
        [c.axleF, WR, -trackZ],
        [c.axleR, WR,  trackZ],
        [c.axleR, WR, -trackZ],
      ].map((pos,i)=>(
        <Wheel key={i} position={pos} wheelId={wheelId}/>
      ))}
    </group>
  )
}

export default function Car3DViewer({ modelIndex=0, colorHex='#0c121c', wheelId='w22_sport', monogram='' }) {
  return (
    <Canvas
      camera={{ position:[5, 2.2, 4], fov:42 }}
      gl={{ antialias:true, alpha:true }}
      shadows
      style={{ width:'100%', height:'100%' }}
    >
      <color attach="background" args={['#0e1018']}/>

      {/* 조명 */}
      <ambientLight intensity={0.45}/>
      <directionalLight position={[6,10,5]} intensity={1.6} castShadow shadow-mapSize={2048}/>
      <directionalLight position={[-5,4,-4]} intensity={0.55} color="#b0c8f0"/>
      <pointLight position={[0,5,0]} intensity={0.4}/>
      <pointLight position={[0,2,3]} intensity={0.3} color="#ffeedd"/>

      {/* HDRI 환경 반사 */}
      <Environment preset="city"/>

      <CarModel
        modelIndex={modelIndex}
        colorHex={colorHex}
        wheelId={wheelId}
        monogram={monogram}
      />

      {/* 바닥 그림자 */}
      <ContactShadows position={[0,0,0]} opacity={0.55} scale={10} blur={2.8}/>

      {/* 드래그로 자유 회전 (확대/이동 잠금) */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.7}
        minPolarAngle={Math.PI/9}
        maxPolarAngle={Math.PI/2.15}
      />
    </Canvas>
  )
}
