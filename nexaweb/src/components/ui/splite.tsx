'use client'

import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div
            style={{
              width: 40, height: 40, borderRadius: '50%',
              border: '3px solid rgba(239,68,68,0.2)',
              borderTopColor: '#ef4444',
              animation: 'spin 0.8s linear infinite',
            }}
          />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  )
}
