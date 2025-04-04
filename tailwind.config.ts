import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          '0': '#FFFFFF',
          '5': '#FFF4E8',
          '10': '#FFE9D2',
          '20': '#FFD4A6',
          '30': '#FFBE78',
          '40': '#FFA94C', // HOVER
          '50': '#FF9320', // BASE / ACTIVE
          '60': '#FF8400', // PRESSED
          '70': '#995813',
          '80': '#663B0D',
          '90': '#331D06',
          '100': '#000000',
        },
        gray: {
          '0': '#FFFFFF',
          '5': '#F8F8F8',
          '10': '#F0F0F0',
          '20': '#E4E4E4', // DISABLED
          '30': '#D8D8D8',
          '40': '#C6C6C6', // LINE
          '50': '#8E8E8E',
          '60': '#717171',
          '70': '#555555',
          '80': '#2D2D2D',
          '90': '#1D1D1D',
          '100': '#000000',
        },
        status: {
          info: '#2768FF', // 정보, 강조
          warning: '#FFA100', // 주의
          success: '#4CAF50', // 성공, 진행
          danger: '#F44336', // 오류, 위험, 삭제
        },
      },
    },
  },
  plugins: [],
};

export default config;

// <!-- Primary color -->
// <button class="bg-primary-50 text-white hover:bg-primary-60">확인</button>

// <!-- Gray background -->
// <div class="bg-gray-5 text-gray-90">본문 텍스트</div>

// <!-- Status example -->
// <span class="text-status-warning">주의!</span>
