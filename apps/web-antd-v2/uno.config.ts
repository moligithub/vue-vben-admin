import { defineConfig, presetUno, presetTypography } from 'unocss'
import { primaryColor } from './build/config/themeConfig'

export default defineConfig({
  presets: [
    presetUno({
      dark: 'class',
    }),
    presetTypography(),
  ],
  theme: {
    colors: {
      primary: primaryColor,
    },
  },
  shortcuts: {
    // 保留原有的入场动画类
    'enter-x': 'enter-x-default',
    '-enter-x': '-enter-x-default',
    'enter-y': 'enter-y-default',
    '-enter-y': '-enter-y-default',
  },
  rules: [
    // 入场动画 - X轴正方向
    [/^enter-x$/, () => ({
      '--enter-x-transform': 'translateX(50px)',
      animation: 'enter-x-animation 0.4s ease-in-out 0.3s forwards',
    })],
    // 入场动画 - X轴负方向
    [/^-enter-x$/, () => ({
      '--enter-x-transform': 'translateX(-50px)',
      animation: 'enter-x-animation 0.4s ease-in-out 0.3s forwards',
    })],
    // 入场动画 - Y轴正方向
    [/^enter-y$/, () => ({
      '--enter-y-transform': 'translateY(50px)',
      animation: 'enter-y-animation 0.4s ease-in-out 0.3s forwards',
    })],
    // 入场动画 - Y轴负方向
    [/^-enter-y$/, () => ({
      '--enter-y-transform': 'translateY(-50px)',
      animation: 'enter-y-animation 0.4s ease-in-out 0.3s forwards',
    })],
    // nth-child 变体 (1-5)
    ...[1, 2, 3, 4, 5].flatMap((i) => [
      [`enter-x-${i}`, () => ({
        '--enter-x-transform': 'translateX(50px)',
        'animation-delay': `${i * 0.1}s`,
        'z-index': `${10 - i}`,
      })],
      [`-enter-x-${i}`, () => ({
        '--enter-x-transform': 'translateX(-50px)',
        'animation-delay': `${i * 0.1}s`,
        'z-index': `${10 - i}`,
      })],
      [`enter-y-${i}`, () => ({
        '--enter-y-transform': 'translateY(50px)',
        'animation-delay': `${i * 0.1}s`,
        'z-index': `${10 - i}`,
      })],
      [`-enter-y-${i}`, () => ({
        '--enter-y-transform': 'translateY(-50px)',
        'animation-delay': `${i * 0.1}s`,
        'z-index': `${10 - i}`,
      })],
    ]),
  ],
  preflights: [
    {
      layer: 'base',
      getCSS: () => `
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
        * {
          --tw-ring-inset: var(--tw-empty, /*!*/ /*!*/);
          --tw-ring-offset-width: 0px;
          --tw-ring-offset-color: #fff;
          --tw-ring-color: rgba(59, 130, 246, 0.5);
          --tw-ring-offset-shadow: 0 0 #0000;
          --tw-ring-shadow: 0 0 #0000;
          --tw-shadow: 0 0 #0000;
        }
        :root {
          -moz-tab-size: 4;
          -o-tab-size: 4;
          tab-size: 4;
        }
        ::-moz-focusring {
          outline: 1px dotted ButtonText;
        }
        ::-moz-ui-invalid {
          box-shadow: none;
        }
        ::-webkit-inner-spin-button,
        ::-webkit-outer-spin-button {
          height: auto;
        }
        ::-webkit-search-decoration {
          -webkit-appearance: none;
        }
        ::-webkit-file-upload-button {
          -webkit-appearance: button;
          font: inherit;
        }
        [type='search'] {
          -webkit-appearance: textfield;
          outline-offset: -2px;
        }
        abbr[title] {
          -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
        }
        a {
          color: inherit;
          text-decoration: inherit;
        }
        body {
          margin: 0;
          font-family: inherit;
          line-height: inherit;
        }
        b {
          font-weight: bolder;
        }
        button {
          text-transform: none;
          background-color: transparent;
          background-image: none;
        }
        html {
          -webkit-text-size-adjust: 100%;
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
            'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
          line-height: 1.5;
        }
        img,
        svg,
        canvas,
        iframe,
        embed,
        video,
        audio {
          display: block;
          vertical-align: middle;
        }
        img,
        video {
          max-width: 100%;
          height: auto;
        }
        pre,
        code {
          font-size: 1em;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
        }
        ul,
        ol {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        @keyframes enter-x-animation {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes enter-y-animation {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `,
    },
  ],
})
