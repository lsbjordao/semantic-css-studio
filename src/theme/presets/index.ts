import type { Theme } from '../schema'

export const minimalPreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Minimal',
    description: 'A calm, portable baseline for semantic HTML.',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#ffffff',
      surface: '#f7f7f5',
      surfaceAlt: '#efefec',
      text: '#202124',
      textMuted: '#666a70',
      primary: '#3157d5',
      primaryHover: '#2443a8',
      primaryText: '#ffffff',
      secondary: '#6b7280',
      border: '#d8d9dc',
      success: '#19733c',
      warning: '#9a6100',
      danger: '#b42318',
      codeBackground: '#17181c',
      codeText: '#f4f4f5',
    },
    typography: {
      fontBody: 'Inter, ui-sans-serif, system-ui, sans-serif',
      fontHeading: 'Inter, ui-sans-serif, system-ui, sans-serif',
      fontMono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      fontSizeBase: '16px',
      fontSizeXs: '0.75rem',
      fontSizeSm: '0.875rem',
      fontSizeMd: '1rem',
      fontSizeLg: '1.25rem',
      fontSizeXl: '2.25rem',
      lineHeightBody: '1.65',
      lineHeightHeading: '1.15',
      fontWeightNormal: '400',
      fontWeightMedium: '600',
      fontWeightBold: '750',
    },
    radius: {
      radiusSm: '0.25rem',
      radiusMd: '0.6rem',
      radiusLg: '1rem',
      radiusFull: '999px',
    },
    shadow: {
      shadowSm: '0 1px 2px rgb(0 0 0 / 0.08)',
      shadowMd: '0 8px 24px rgb(0 0 0 / 0.10)',
      shadowLg: '0 20px 50px rgb(0 0 0 / 0.14)',
    },
    spacing: {
      spaceXs: '0.25rem',
      spaceSm: '0.5rem',
      spaceMd: '1rem',
      spaceLg: '1.5rem',
      spaceXl: '2.25rem',
      space2xl: '4rem',
      space2xlXs: '2.5rem',
    },
    layout: {
      contentWidth: '72ch',
      wideWidth: '1120px',
      bodyPadding: '1.25rem',
      sectionSpacing: '3rem',
      headerWidth: '1120px',
      footerWidth: '1120px',
      bodyPaddingSm: '1rem',
      bodyPaddingXs: '0.8rem',
      sectionSpacingSm: '2rem',
    },
    scroll: {
      scrollbarWidth: 'auto',
      scrollbarSize: '12px',
      scrollbarTrack: 'var(--color-surface)',
      scrollbarThumb: 'var(--color-border)',
      scrollbarThumbHover: 'var(--color-text-muted)',
      scrollbarRadius: 'var(--radius-full)',
      scrollbarGutter: 'auto',
      scrollBehavior: 'auto',
      scrollPaddingTop: '0',
      overscrollBehavior: 'auto',
    },
  },
  modes: {
    light: {
      colors: {},
    },
    dark: {
      colors: {
        background: '#111317',
        surface: '#181b20',
        surfaceAlt: '#23272e',
        text: '#eceef2',
        textMuted: '#a9b0ba',
        primary: '#8aa4ff',
        primaryHover: '#a9b9ff',
        primaryText: '#11162c',
        border: '#343a43',
        codeBackground: '#090a0c',
        codeText: '#f5f7fa',
      },
    },
  },
  layers: {
    base: {
      html: {
        colorScheme: 'light dark',
        background: 'var(--color-background)',
      },
      'h1, h2, h3, h4, h5, h6': {
        fontFamily: 'var(--font-heading)',
        fontWeight: 'var(--font-weight-bold)',
        lineHeight: 'var(--line-height-heading)',
        marginBlock: '1.25em 0.5em',
      },
      'p, ul, ol, dl, blockquote, pre, figure, table, form, details': {
        marginBlock: '0 var(--space-lg)',
      },
      'th, td': {
        padding: 'var(--space-sm) var(--space-md)',
        verticalAlign: 'top',
      },
      label: {
        display: 'block',
        marginBlock: 'var(--space-sm)',
      },
      'input:not([type="checkbox"]):not([type="radio"]), textarea, select': {
        width: '100%',
      },
      'input, textarea, select, button': {
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        color: 'var(--color-text)',
        font: 'inherit',
        padding: '0.65rem 0.8rem',
      },
      button: {
        background: 'var(--color-primary)',
        color: 'var(--color-primary-text)',
      },
      'pre code': {
        background: 'transparent',
        color: 'inherit',
        padding: '0',
      },
    },
    elements: {
      body: {
        margin: '0',
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--font-size-base)',
        lineHeight: 'var(--line-height-body)',
      },
      header: {
        maxWidth: 'var(--header-width)',
        marginInline: 'auto',
        padding: 'var(--space-lg) var(--body-padding)',
      },
      nav: {
        display: 'flex',
        gap: 'var(--space-md)',
        alignItems: 'center',
        flexWrap: 'wrap',
      },
      main: {
        maxWidth: 'var(--content-width)',
        marginInline: 'auto',
        padding: 'var(--space-lg) var(--body-padding) var(--space-2xl)',
      },
      section: {
        marginBlock: 'var(--section-spacing)',
      },
      article: {
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-lg)',
        boxShadow: 'var(--shadow-sm)',
      },
      aside: {
        borderInlineStart: '4px solid var(--color-primary)',
        backgroundColor: 'var(--color-surface)',
        padding: 'var(--space-md)',
      },
      footer: {
        maxWidth: 'var(--footer-width)',
        marginInline: 'auto',
        padding: 'var(--space-xl) var(--body-padding)',
        color: 'var(--color-text-muted)',
        borderTop: '1px solid var(--color-border)',
      },
      h1: {
        fontSize: 'clamp(2.2rem, 7vw, 4.25rem)',
      },
      h2: {
        fontSize: 'clamp(1.7rem, 5vw, 2.6rem)',
      },
      h3: {
        fontSize: '1.5rem',
      },
      h4: {
        fontSize: '1.25rem',
      },
      h5: {
        fontSize: '1.05rem',
      },
      h6: {
        fontSize: '0.95rem',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      },
      a: {
        color: 'var(--color-primary)',
        textUnderlineOffset: '0.2em',
      },
      mark: {
        backgroundColor:
          'color-mix(in srgb, var(--color-warning) 25%, transparent)',
        color: 'inherit',
      },
      blockquote: {
        marginInline: '0',
        padding: 'var(--space-md) var(--space-lg)',
        borderInlineStart: '4px solid var(--color-primary)',
        color: 'var(--color-text-muted)',
      },
      hr: {
        border: '0',
        borderTop: '1px solid var(--color-border)',
        marginBlock: 'var(--space-xl)',
      },
      code: {
        fontFamily: 'var(--font-mono)',
        backgroundColor: 'var(--color-surface-alt)',
        borderRadius: 'var(--radius-sm)',
        padding: '0.1em 0.35em',
      },
      pre: {
        backgroundColor: 'var(--color-code-background)',
        color: 'var(--color-code-text)',
        padding: 'var(--space-lg)',
        borderRadius: 'var(--radius-md)',
        overflowX: 'auto',
      },
      kbd: {
        fontFamily: 'var(--font-mono)',
        border: '1px solid var(--color-border)',
        borderBottomWidth: '3px',
        borderRadius: 'var(--radius-sm)',
        padding: '0.12rem 0.4rem',
        backgroundColor: 'var(--color-surface)',
      },
      table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBlock: 'var(--space-lg)',
      },
      th: {
        textAlign: 'left',
        backgroundColor: 'var(--color-surface)',
      },
      td: {
        borderTop: '1px solid var(--color-border)',
      },
      caption: {
        color: 'var(--color-text-muted)',
        marginBottom: 'var(--space-sm)',
        textAlign: 'left',
      },
      fieldset: {
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-lg)',
      },
      input: {
        boxSizing: 'border-box',
      },
      textarea: {
        width: '100%',
        boxSizing: 'border-box',
        minHeight: '7rem',
        resize: 'vertical',
      },
      select: {
        width: '100%',
        boxSizing: 'border-box',
      },
      button: {
        cursor: 'pointer',
        fontWeight: 'var(--font-weight-medium)',
      },
      img: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: 'var(--radius-md)',
      },
      figure: {
        marginInline: '0',
      },
      figcaption: {
        color: 'var(--color-text-muted)',
        fontSize: 'var(--font-size-sm)',
      },
      details: {
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-md)',
      },
      summary: {
        cursor: 'pointer',
        fontWeight: 'var(--font-weight-medium)',
      },
    },
    states: {
      'a:hover': {
        color: 'var(--color-primary-hover)',
      },
      'a:focus-visible': {
        outline:
          '3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)',
        outlineOffset: '3px',
      },
      'button:hover': {
        backgroundColor: 'var(--color-primary-hover)',
      },
      'button:focus-visible': {
        outline:
          '3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)',
        outlineOffset: '3px',
      },
      'button:active': {
        transform: 'translateY(1px)',
      },
      'button:disabled': {
        opacity: '0.55',
        cursor: 'not-allowed',
      },
      'input:focus-visible': {
        outline:
          '3px solid color-mix(in srgb, var(--color-primary) 35%, transparent)',
        borderColor: 'var(--color-primary)',
      },
      'input:disabled': {
        opacity: '0.6',
        cursor: 'not-allowed',
      },
      'input:checked': {
        accentColor: 'var(--color-primary)',
      },
    },
    responsive: {
      tablet: {
        ':root': {
          '--body-padding': 'var(--body-padding-sm)',
          '--section-spacing': 'var(--section-spacing-sm)',
        },
        table: {
          fontSize: 'var(--font-size-sm)',
        },
      },
      mobile: {
        ':root': {
          '--body-padding': 'var(--body-padding-xs)',
          '--space-2xl': 'var(--space-2xl-xs)',
        },
        h1: {
          overflowWrap: 'anywhere',
        },
      },
    },
  },
  breakpoints: {
    mobile: 390,
    tablet: 768,
    desktop: 1440,
  },
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
} as unknown as Theme

export const editorialPreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Editorial',
    description:
      'A serif-forward theme for essays, magazines and long-form reading.',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#fbf8f1',
      surface: '#fffdf8',
      surfaceAlt: '#eee7da',
      text: '#2e281f',
      textMuted: '#776b5a',
      primary: '#9b351f',
      primaryHover: '#702516',
      primaryText: '#ffffff',
      secondary: '#6b7280',
      border: '#d9cfbf',
      success: '#19733c',
      warning: '#9a6100',
      danger: '#b42318',
      codeBackground: '#17181c',
      codeText: '#f4f4f5',
    },
    typography: {
      fontBody: 'Georgia, Cambria, Times New Roman, serif',
      fontHeading: 'Georgia, Cambria, Times New Roman, serif',
      fontMono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      fontSizeBase: '18px',
      fontSizeXs: '0.75rem',
      fontSizeSm: '0.875rem',
      fontSizeMd: '1rem',
      fontSizeLg: '1.25rem',
      fontSizeXl: '2.25rem',
      lineHeightBody: '1.75',
      lineHeightHeading: '1.05',
      fontWeightNormal: '400',
      fontWeightMedium: '600',
      fontWeightBold: '750',
    },
    radius: {
      radiusSm: '0.25rem',
      radiusMd: '0.6rem',
      radiusLg: '1rem',
      radiusFull: '999px',
    },
    shadow: {
      shadowSm: '0 1px 2px rgb(0 0 0 / 0.08)',
      shadowMd: '0 8px 24px rgb(0 0 0 / 0.10)',
      shadowLg: '0 20px 50px rgb(0 0 0 / 0.14)',
    },
    spacing: {
      spaceXs: '0.25rem',
      spaceSm: '0.5rem',
      spaceMd: '1rem',
      spaceLg: '1.5rem',
      spaceXl: '2.25rem',
      space2xl: '4rem',
      space2xlXs: '2.5rem',
    },
    layout: {
      contentWidth: '66ch',
      wideWidth: '1120px',
      bodyPadding: '1.25rem',
      sectionSpacing: '3rem',
      headerWidth: '1120px',
      footerWidth: '1120px',
      bodyPaddingSm: '1rem',
      bodyPaddingXs: '0.8rem',
      sectionSpacingSm: '2rem',
    },
    scroll: {
      scrollbarWidth: 'auto',
      scrollbarSize: '12px',
      scrollbarTrack: 'var(--color-surface)',
      scrollbarThumb: 'var(--color-border)',
      scrollbarThumbHover: 'var(--color-text-muted)',
      scrollbarRadius: 'var(--radius-full)',
      scrollbarGutter: 'auto',
      scrollBehavior: 'auto',
      scrollPaddingTop: '0',
      overscrollBehavior: 'auto',
    },
  },
  modes: {
    light: {
      colors: {},
    },
    dark: {
      colors: {
        background: '#181510',
        surface: '#201c16',
        surfaceAlt: '#2b251c',
        text: '#f2eadc',
        textMuted: '#b9ac99',
        primary: '#ff9576',
        primaryHover: '#ffb19b',
        primaryText: '#11162c',
        border: '#453c31',
        codeBackground: '#090a0c',
        codeText: '#f5f7fa',
      },
    },
  },
  layers: {
    base: {
      html: {
        colorScheme: 'light dark',
        background: 'var(--color-background)',
      },
      'h1, h2, h3, h4, h5, h6': {
        fontFamily: 'var(--font-heading)',
        fontWeight: 'var(--font-weight-bold)',
        lineHeight: 'var(--line-height-heading)',
        marginBlock: '1.25em 0.5em',
      },
      'p, ul, ol, dl, blockquote, pre, figure, table, form, details': {
        marginBlock: '0 var(--space-lg)',
      },
      'th, td': {
        padding: 'var(--space-sm) var(--space-md)',
        verticalAlign: 'top',
      },
      label: {
        display: 'block',
        marginBlock: 'var(--space-sm)',
      },
      'input:not([type="checkbox"]):not([type="radio"]), textarea, select': {
        width: '100%',
      },
      'input, textarea, select, button': {
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        color: 'var(--color-text)',
        font: 'inherit',
        padding: '0.65rem 0.8rem',
      },
      button: {
        background: 'var(--color-primary)',
        color: 'var(--color-primary-text)',
      },
      'pre code': {
        background: 'transparent',
        color: 'inherit',
        padding: '0',
      },
    },
    elements: {
      body: {
        margin: '0',
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--font-size-base)',
        lineHeight: 'var(--line-height-body)',
      },
      header: {
        maxWidth: 'var(--header-width)',
        marginInline: 'auto',
        padding: 'var(--space-lg) var(--body-padding)',
      },
      nav: {
        display: 'flex',
        gap: 'var(--space-md)',
        alignItems: 'center',
        flexWrap: 'wrap',
      },
      main: {
        maxWidth: 'var(--content-width)',
        marginInline: 'auto',
        padding: 'var(--space-lg) var(--body-padding) var(--space-2xl)',
      },
      section: {
        marginBlock: 'var(--section-spacing)',
      },
      article: {
        backgroundColor: 'transparent',
        border: '0',
        padding: '0',
        boxShadow: 'none',
      },
      aside: {
        borderInlineStart: '4px solid var(--color-primary)',
        backgroundColor: 'var(--color-surface)',
        padding: 'var(--space-md)',
      },
      footer: {
        maxWidth: 'var(--footer-width)',
        marginInline: 'auto',
        padding: 'var(--space-xl) var(--body-padding)',
        color: 'var(--color-text-muted)',
        borderTop: '1px solid var(--color-border)',
      },
      h1: {
        fontSize: 'clamp(2.8rem, 8vw, 5.8rem)',
        letterSpacing: '-0.045em',
      },
      h2: {
        fontSize: 'clamp(2rem, 5vw, 3.4rem)',
        letterSpacing: '-0.03em',
      },
      h3: {
        fontSize: '1.5rem',
      },
      h4: {
        fontSize: '1.25rem',
      },
      h5: {
        fontSize: '1.05rem',
      },
      h6: {
        fontSize: '0.95rem',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      },
      a: {
        color: 'var(--color-primary)',
        textUnderlineOffset: '0.2em',
      },
      mark: {
        backgroundColor:
          'color-mix(in srgb, var(--color-warning) 25%, transparent)',
        color: 'inherit',
      },
      blockquote: {
        fontSize: '1.2em',
        fontStyle: 'italic',
        borderInlineStart: '0',
        borderBlock: '1px solid var(--color-border)',
        padding: 'var(--space-lg) 0',
      },
      hr: {
        border: '0',
        borderTop: '1px solid var(--color-border)',
        marginBlock: 'var(--space-xl)',
      },
      code: {
        fontFamily: 'var(--font-mono)',
        backgroundColor: 'var(--color-surface-alt)',
        borderRadius: 'var(--radius-sm)',
        padding: '0.1em 0.35em',
      },
      pre: {
        backgroundColor: 'var(--color-code-background)',
        color: 'var(--color-code-text)',
        padding: 'var(--space-lg)',
        borderRadius: 'var(--radius-md)',
        overflowX: 'auto',
      },
      kbd: {
        fontFamily: 'var(--font-mono)',
        border: '1px solid var(--color-border)',
        borderBottomWidth: '3px',
        borderRadius: 'var(--radius-sm)',
        padding: '0.12rem 0.4rem',
        backgroundColor: 'var(--color-surface)',
      },
      table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBlock: 'var(--space-lg)',
      },
      th: {
        textAlign: 'left',
        backgroundColor: 'var(--color-surface)',
      },
      td: {
        borderTop: '1px solid var(--color-border)',
      },
      caption: {
        color: 'var(--color-text-muted)',
        marginBottom: 'var(--space-sm)',
        textAlign: 'left',
      },
      fieldset: {
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-lg)',
      },
      input: {
        boxSizing: 'border-box',
      },
      textarea: {
        width: '100%',
        boxSizing: 'border-box',
        minHeight: '7rem',
        resize: 'vertical',
      },
      select: {
        width: '100%',
        boxSizing: 'border-box',
      },
      button: {
        cursor: 'pointer',
        fontWeight: 'var(--font-weight-medium)',
      },
      img: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: 'var(--radius-md)',
      },
      figure: {
        marginInline: '0',
      },
      figcaption: {
        color: 'var(--color-text-muted)',
        fontSize: 'var(--font-size-sm)',
      },
      details: {
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-md)',
      },
      summary: {
        cursor: 'pointer',
        fontWeight: 'var(--font-weight-medium)',
      },
    },
    states: {
      'a:hover': {
        color: 'var(--color-primary-hover)',
      },
      'a:focus-visible': {
        outline:
          '3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)',
        outlineOffset: '3px',
      },
      'button:hover': {
        backgroundColor: 'var(--color-primary-hover)',
      },
      'button:focus-visible': {
        outline:
          '3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)',
        outlineOffset: '3px',
      },
      'button:active': {
        transform: 'translateY(1px)',
      },
      'button:disabled': {
        opacity: '0.55',
        cursor: 'not-allowed',
      },
      'input:focus-visible': {
        outline:
          '3px solid color-mix(in srgb, var(--color-primary) 35%, transparent)',
        borderColor: 'var(--color-primary)',
      },
      'input:disabled': {
        opacity: '0.6',
        cursor: 'not-allowed',
      },
      'input:checked': {
        accentColor: 'var(--color-primary)',
      },
    },
    responsive: {
      tablet: {
        ':root': {
          '--body-padding': 'var(--body-padding-sm)',
          '--section-spacing': 'var(--section-spacing-sm)',
        },
        table: {
          fontSize: 'var(--font-size-sm)',
        },
      },
      mobile: {
        ':root': {
          '--body-padding': 'var(--body-padding-xs)',
          '--space-2xl': 'var(--space-2xl-xs)',
        },
        h1: {
          overflowWrap: 'anywhere',
        },
      },
    },
  },
  breakpoints: {
    mobile: 390,
    tablet: 768,
    desktop: 1440,
  },
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
} as unknown as Theme

export const documentationPreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Documentation',
    description: 'Crisp sans-serif styling for technical documentation.',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#f8fafc',
      surface: '#ffffff',
      surfaceAlt: '#eef2f7',
      text: '#172033',
      textMuted: '#596579',
      primary: '#0a68d8',
      primaryHover: '#0753ad',
      primaryText: '#ffffff',
      secondary: '#6b7280',
      border: '#d8e0eb',
      success: '#19733c',
      warning: '#9a6100',
      danger: '#b42318',
      codeBackground: '#0d1726',
      codeText: '#f4f4f5',
    },
    typography: {
      fontBody: 'Inter, ui-sans-serif, system-ui, sans-serif',
      fontHeading: 'Inter, ui-sans-serif, system-ui, sans-serif',
      fontMono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      fontSizeBase: '16px',
      fontSizeXs: '0.75rem',
      fontSizeSm: '0.875rem',
      fontSizeMd: '1rem',
      fontSizeLg: '1.25rem',
      fontSizeXl: '2.25rem',
      lineHeightBody: '1.65',
      lineHeightHeading: '1.15',
      fontWeightNormal: '400',
      fontWeightMedium: '600',
      fontWeightBold: '750',
    },
    radius: {
      radiusSm: '0.25rem',
      radiusMd: '0.35rem',
      radiusLg: '0.5rem',
      radiusFull: '999px',
    },
    shadow: {
      shadowSm: '0 1px 2px rgb(0 0 0 / 0.08)',
      shadowMd: '0 8px 24px rgb(0 0 0 / 0.10)',
      shadowLg: '0 20px 50px rgb(0 0 0 / 0.14)',
    },
    spacing: {
      spaceXs: '0.25rem',
      spaceSm: '0.5rem',
      spaceMd: '1rem',
      spaceLg: '1.5rem',
      spaceXl: '2.25rem',
      space2xl: '4rem',
      space2xlXs: '2.5rem',
    },
    layout: {
      contentWidth: '78ch',
      wideWidth: '1120px',
      bodyPadding: '1.25rem',
      sectionSpacing: '3rem',
      headerWidth: '1120px',
      footerWidth: '1120px',
      bodyPaddingSm: '1rem',
      bodyPaddingXs: '0.8rem',
      sectionSpacingSm: '2rem',
    },
    scroll: {
      scrollbarWidth: 'auto',
      scrollbarSize: '12px',
      scrollbarTrack: 'var(--color-surface)',
      scrollbarThumb: 'var(--color-border)',
      scrollbarThumbHover: 'var(--color-text-muted)',
      scrollbarRadius: 'var(--radius-full)',
      scrollbarGutter: 'auto',
      scrollBehavior: 'auto',
      scrollPaddingTop: '0',
      overscrollBehavior: 'auto',
    },
  },
  modes: {
    light: {
      colors: {},
    },
    dark: {
      colors: {
        background: '#0f1724',
        surface: '#151f2e',
        surfaceAlt: '#1d2a3b',
        text: '#e8edf5',
        textMuted: '#a5b1c2',
        primary: '#78b7ff',
        primaryHover: '#a5ceff',
        primaryText: '#11162c',
        border: '#2c3b50',
        codeBackground: '#090a0c',
        codeText: '#f5f7fa',
      },
    },
  },
  layers: {
    base: {
      html: {
        colorScheme: 'light dark',
        background: 'var(--color-background)',
      },
      'h1, h2, h3, h4, h5, h6': {
        fontFamily: 'var(--font-heading)',
        fontWeight: 'var(--font-weight-bold)',
        lineHeight: 'var(--line-height-heading)',
        marginBlock: '1.25em 0.5em',
      },
      'p, ul, ol, dl, blockquote, pre, figure, table, form, details': {
        marginBlock: '0 var(--space-lg)',
      },
      'th, td': {
        padding: 'var(--space-sm) var(--space-md)',
        verticalAlign: 'top',
      },
      label: {
        display: 'block',
        marginBlock: 'var(--space-sm)',
      },
      'input:not([type="checkbox"]):not([type="radio"]), textarea, select': {
        width: '100%',
      },
      'input, textarea, select, button': {
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        color: 'var(--color-text)',
        font: 'inherit',
        padding: '0.65rem 0.8rem',
      },
      button: {
        background: 'var(--color-primary)',
        color: 'var(--color-primary-text)',
      },
      'pre code': {
        background: 'transparent',
        color: 'inherit',
        padding: '0',
      },
    },
    elements: {
      body: {
        margin: '0',
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--font-size-base)',
        lineHeight: 'var(--line-height-body)',
      },
      header: {
        maxWidth: 'var(--header-width)',
        marginInline: 'auto',
        padding: 'var(--space-lg) var(--body-padding)',
      },
      nav: {
        display: 'flex',
        gap: 'var(--space-md)',
        alignItems: 'center',
        flexWrap: 'wrap',
      },
      main: {
        maxWidth: 'var(--content-width)',
        marginInline: 'auto',
        padding: 'var(--space-lg) var(--body-padding) var(--space-2xl)',
      },
      section: {
        marginBlock: 'var(--section-spacing)',
      },
      article: {
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-xl)',
        boxShadow: 'none',
      },
      aside: {
        borderInlineStart: '4px solid var(--color-primary)',
        backgroundColor: 'var(--color-surface)',
        padding: 'var(--space-md)',
      },
      footer: {
        maxWidth: 'var(--footer-width)',
        marginInline: 'auto',
        padding: 'var(--space-xl) var(--body-padding)',
        color: 'var(--color-text-muted)',
        borderTop: '1px solid var(--color-border)',
      },
      h1: {
        fontSize: '2.75rem',
        letterSpacing: '-0.035em',
      },
      h2: {
        fontSize: '1.8rem',
        borderBottom: '1px solid var(--color-border)',
        paddingBottom: '0.35em',
      },
      h3: {
        fontSize: '1.5rem',
      },
      h4: {
        fontSize: '1.25rem',
      },
      h5: {
        fontSize: '1.05rem',
      },
      h6: {
        fontSize: '0.95rem',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      },
      a: {
        color: 'var(--color-primary)',
        textUnderlineOffset: '0.2em',
      },
      mark: {
        backgroundColor:
          'color-mix(in srgb, var(--color-warning) 25%, transparent)',
        color: 'inherit',
      },
      blockquote: {
        marginInline: '0',
        padding: 'var(--space-md) var(--space-lg)',
        borderInlineStart: '4px solid var(--color-primary)',
        color: 'var(--color-text-muted)',
      },
      hr: {
        border: '0',
        borderTop: '1px solid var(--color-border)',
        marginBlock: 'var(--space-xl)',
      },
      code: {
        fontFamily: 'var(--font-mono)',
        backgroundColor: 'var(--color-surface-alt)',
        borderRadius: 'var(--radius-sm)',
        padding: '0.1em 0.35em',
      },
      pre: {
        backgroundColor: 'var(--color-code-background)',
        color: 'var(--color-code-text)',
        padding: 'var(--space-lg)',
        borderRadius: 'var(--radius-md)',
        overflowX: 'auto',
      },
      kbd: {
        fontFamily: 'var(--font-mono)',
        border: '1px solid var(--color-border)',
        borderBottomWidth: '3px',
        borderRadius: 'var(--radius-sm)',
        padding: '0.12rem 0.4rem',
        backgroundColor: 'var(--color-surface)',
      },
      table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBlock: 'var(--space-lg)',
      },
      th: {
        textAlign: 'left',
        backgroundColor: 'var(--color-surface)',
      },
      td: {
        borderTop: '1px solid var(--color-border)',
      },
      caption: {
        color: 'var(--color-text-muted)',
        marginBottom: 'var(--space-sm)',
        textAlign: 'left',
      },
      fieldset: {
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-lg)',
      },
      input: {
        boxSizing: 'border-box',
      },
      textarea: {
        width: '100%',
        boxSizing: 'border-box',
        minHeight: '7rem',
        resize: 'vertical',
      },
      select: {
        width: '100%',
        boxSizing: 'border-box',
      },
      button: {
        cursor: 'pointer',
        fontWeight: 'var(--font-weight-medium)',
      },
      img: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: 'var(--radius-md)',
      },
      figure: {
        marginInline: '0',
      },
      figcaption: {
        color: 'var(--color-text-muted)',
        fontSize: 'var(--font-size-sm)',
      },
      details: {
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-md)',
      },
      summary: {
        cursor: 'pointer',
        fontWeight: 'var(--font-weight-medium)',
      },
    },
    states: {
      'a:hover': {
        color: 'var(--color-primary-hover)',
      },
      'a:focus-visible': {
        outline:
          '3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)',
        outlineOffset: '3px',
      },
      'button:hover': {
        backgroundColor: 'var(--color-primary-hover)',
      },
      'button:focus-visible': {
        outline:
          '3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)',
        outlineOffset: '3px',
      },
      'button:active': {
        transform: 'translateY(1px)',
      },
      'button:disabled': {
        opacity: '0.55',
        cursor: 'not-allowed',
      },
      'input:focus-visible': {
        outline:
          '3px solid color-mix(in srgb, var(--color-primary) 35%, transparent)',
        borderColor: 'var(--color-primary)',
      },
      'input:disabled': {
        opacity: '0.6',
        cursor: 'not-allowed',
      },
      'input:checked': {
        accentColor: 'var(--color-primary)',
      },
    },
    responsive: {
      tablet: {
        ':root': {
          '--body-padding': 'var(--body-padding-sm)',
          '--section-spacing': 'var(--section-spacing-sm)',
        },
        table: {
          fontSize: 'var(--font-size-sm)',
        },
      },
      mobile: {
        ':root': {
          '--body-padding': 'var(--body-padding-xs)',
          '--space-2xl': 'var(--space-2xl-xs)',
        },
        h1: {
          overflowWrap: 'anywhere',
        },
      },
    },
  },
  breakpoints: {
    mobile: 390,
    tablet: 768,
    desktop: 1440,
  },
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
} as unknown as Theme

export const academicPreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Academic',
    description:
      'Reserved typography and spacing for papers and scholarly notes.',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#fffefe',
      surface: '#ffffff',
      surfaceAlt: '#f4f4f4',
      text: '#111111',
      textMuted: '#555555',
      primary: '#174a7e',
      primaryHover: '#0f345a',
      primaryText: '#ffffff',
      secondary: '#6b7280',
      border: '#cfcfcf',
      success: '#19733c',
      warning: '#9a6100',
      danger: '#b42318',
      codeBackground: '#17181c',
      codeText: '#f4f4f5',
    },
    typography: {
      fontBody: 'Charter, Georgia, Times New Roman, serif',
      fontHeading: 'Charter, Georgia, Times New Roman, serif',
      fontMono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      fontSizeBase: '17px',
      fontSizeXs: '0.75rem',
      fontSizeSm: '0.875rem',
      fontSizeMd: '1rem',
      fontSizeLg: '1.25rem',
      fontSizeXl: '2.25rem',
      lineHeightBody: '1.7',
      lineHeightHeading: '1.15',
      fontWeightNormal: '400',
      fontWeightMedium: '600',
      fontWeightBold: '750',
    },
    radius: {
      radiusSm: '0',
      radiusMd: '0',
      radiusLg: '0',
      radiusFull: '999px',
    },
    shadow: {
      shadowSm: 'none',
      shadowMd: 'none',
      shadowLg: 'none',
    },
    spacing: {
      spaceXs: '0.25rem',
      spaceSm: '0.5rem',
      spaceMd: '1rem',
      spaceLg: '1.5rem',
      spaceXl: '2.25rem',
      space2xl: '4rem',
      space2xlXs: '2.5rem',
    },
    layout: {
      contentWidth: '70ch',
      wideWidth: '1120px',
      bodyPadding: '1.25rem',
      sectionSpacing: '3rem',
      headerWidth: '1120px',
      footerWidth: '1120px',
      bodyPaddingSm: '1rem',
      bodyPaddingXs: '0.8rem',
      sectionSpacingSm: '2rem',
    },
    scroll: {
      scrollbarWidth: 'auto',
      scrollbarSize: '12px',
      scrollbarTrack: 'var(--color-surface)',
      scrollbarThumb: 'var(--color-border)',
      scrollbarThumbHover: 'var(--color-text-muted)',
      scrollbarRadius: 'var(--radius-full)',
      scrollbarGutter: 'auto',
      scrollBehavior: 'auto',
      scrollPaddingTop: '0',
      overscrollBehavior: 'auto',
    },
  },
  modes: {
    light: {
      colors: {},
    },
    dark: {
      colors: {
        background: '#111317',
        surface: '#181b20',
        surfaceAlt: '#23272e',
        text: '#eceef2',
        textMuted: '#a9b0ba',
        primary: '#8aa4ff',
        primaryHover: '#a9b9ff',
        primaryText: '#11162c',
        border: '#343a43',
        codeBackground: '#090a0c',
        codeText: '#f5f7fa',
      },
    },
  },
  layers: {
    base: {
      html: {
        colorScheme: 'light dark',
        background: 'var(--color-background)',
      },
      'h1, h2, h3, h4, h5, h6': {
        fontFamily: 'var(--font-heading)',
        fontWeight: 'var(--font-weight-bold)',
        lineHeight: 'var(--line-height-heading)',
        marginBlock: '1.25em 0.5em',
      },
      'p, ul, ol, dl, blockquote, pre, figure, table, form, details': {
        marginBlock: '0 var(--space-lg)',
      },
      'th, td': {
        padding: 'var(--space-sm) var(--space-md)',
        verticalAlign: 'top',
      },
      label: {
        display: 'block',
        marginBlock: 'var(--space-sm)',
      },
      'input:not([type="checkbox"]):not([type="radio"]), textarea, select': {
        width: '100%',
      },
      'input, textarea, select, button': {
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        color: 'var(--color-text)',
        font: 'inherit',
        padding: '0.65rem 0.8rem',
      },
      button: {
        background: 'var(--color-primary)',
        color: 'var(--color-primary-text)',
      },
      'pre code': {
        background: 'transparent',
        color: 'inherit',
        padding: '0',
      },
    },
    elements: {
      body: {
        margin: '0',
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--font-size-base)',
        lineHeight: 'var(--line-height-body)',
      },
      header: {
        maxWidth: 'var(--header-width)',
        marginInline: 'auto',
        padding: 'var(--space-lg) var(--body-padding)',
      },
      nav: {
        display: 'flex',
        gap: 'var(--space-md)',
        alignItems: 'center',
        flexWrap: 'wrap',
      },
      main: {
        maxWidth: 'var(--content-width)',
        marginInline: 'auto',
        padding: 'var(--space-lg) var(--body-padding) var(--space-2xl)',
      },
      section: {
        marginBlock: 'var(--section-spacing)',
      },
      article: {
        backgroundColor: 'transparent',
        border: '0',
        borderRadius: '0',
        padding: '0',
        boxShadow: 'none',
      },
      aside: {
        borderInlineStart: '4px solid var(--color-primary)',
        backgroundColor: 'var(--color-surface)',
        padding: 'var(--space-md)',
      },
      footer: {
        maxWidth: 'var(--footer-width)',
        marginInline: 'auto',
        padding: 'var(--space-xl) var(--body-padding)',
        color: 'var(--color-text-muted)',
        borderTop: '1px solid var(--color-border)',
      },
      h1: {
        fontSize: '2.4rem',
        textAlign: 'center',
      },
      h2: {
        fontSize: '1.6rem',
      },
      h3: {
        fontSize: '1.5rem',
      },
      h4: {
        fontSize: '1.25rem',
      },
      h5: {
        fontSize: '1.05rem',
      },
      h6: {
        fontSize: '0.95rem',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      },
      a: {
        color: 'var(--color-primary)',
        textUnderlineOffset: '0.2em',
      },
      mark: {
        backgroundColor:
          'color-mix(in srgb, var(--color-warning) 25%, transparent)',
        color: 'inherit',
      },
      blockquote: {
        borderInlineStart: '2px solid var(--color-border)',
        fontSize: '0.96em',
      },
      hr: {
        border: '0',
        borderTop: '1px solid var(--color-border)',
        marginBlock: 'var(--space-xl)',
      },
      code: {
        fontFamily: 'var(--font-mono)',
        backgroundColor: 'var(--color-surface-alt)',
        borderRadius: 'var(--radius-sm)',
        padding: '0.1em 0.35em',
      },
      pre: {
        backgroundColor: 'var(--color-code-background)',
        color: 'var(--color-code-text)',
        padding: 'var(--space-lg)',
        borderRadius: 'var(--radius-md)',
        overflowX: 'auto',
      },
      kbd: {
        fontFamily: 'var(--font-mono)',
        border: '1px solid var(--color-border)',
        borderBottomWidth: '3px',
        borderRadius: 'var(--radius-sm)',
        padding: '0.12rem 0.4rem',
        backgroundColor: 'var(--color-surface)',
      },
      table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBlock: 'var(--space-lg)',
      },
      th: {
        textAlign: 'left',
        backgroundColor: 'var(--color-surface)',
      },
      td: {
        borderTop: '1px solid var(--color-border)',
      },
      caption: {
        color: 'var(--color-text-muted)',
        marginBottom: 'var(--space-sm)',
        textAlign: 'left',
      },
      fieldset: {
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-lg)',
      },
      input: {
        boxSizing: 'border-box',
      },
      textarea: {
        width: '100%',
        boxSizing: 'border-box',
        minHeight: '7rem',
        resize: 'vertical',
      },
      select: {
        width: '100%',
        boxSizing: 'border-box',
      },
      button: {
        cursor: 'pointer',
        fontWeight: 'var(--font-weight-medium)',
      },
      img: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: 'var(--radius-md)',
      },
      figure: {
        marginInline: '0',
      },
      figcaption: {
        color: 'var(--color-text-muted)',
        fontSize: 'var(--font-size-sm)',
      },
      details: {
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-md)',
      },
      summary: {
        cursor: 'pointer',
        fontWeight: 'var(--font-weight-medium)',
      },
    },
    states: {
      'a:hover': {
        color: 'var(--color-primary-hover)',
      },
      'a:focus-visible': {
        outline:
          '3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)',
        outlineOffset: '3px',
      },
      'button:hover': {
        backgroundColor: 'var(--color-primary-hover)',
      },
      'button:focus-visible': {
        outline:
          '3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)',
        outlineOffset: '3px',
      },
      'button:active': {
        transform: 'translateY(1px)',
      },
      'button:disabled': {
        opacity: '0.55',
        cursor: 'not-allowed',
      },
      'input:focus-visible': {
        outline:
          '3px solid color-mix(in srgb, var(--color-primary) 35%, transparent)',
        borderColor: 'var(--color-primary)',
      },
      'input:disabled': {
        opacity: '0.6',
        cursor: 'not-allowed',
      },
      'input:checked': {
        accentColor: 'var(--color-primary)',
      },
    },
    responsive: {
      tablet: {
        ':root': {
          '--body-padding': 'var(--body-padding-sm)',
          '--section-spacing': 'var(--section-spacing-sm)',
        },
        table: {
          fontSize: 'var(--font-size-sm)',
        },
      },
      mobile: {
        ':root': {
          '--body-padding': 'var(--body-padding-xs)',
          '--space-2xl': 'var(--space-2xl-xs)',
        },
        h1: {
          overflowWrap: 'anywhere',
        },
      },
    },
  },
  breakpoints: {
    mobile: 390,
    tablet: 768,
    desktop: 1440,
  },
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
} as unknown as Theme

export const terminalPreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Terminal',
    description: 'A monochrome, command-line inspired semantic theme.',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#071009',
      surface: '#0b160d',
      surfaceAlt: '#112017',
      text: '#b9f7c2',
      textMuted: '#75a97e',
      primary: '#74f38a',
      primaryHover: '#a6ffb5',
      primaryText: '#061008',
      secondary: '#66c877',
      border: '#244d2d',
      success: '#74f38a',
      warning: '#e0d06c',
      danger: '#ff817e',
      codeBackground: '#030804',
      codeText: '#c9ffd1',
    },
    typography: {
      fontBody: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      fontHeading: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      fontMono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      fontSizeBase: '15px',
      fontSizeXs: '0.75rem',
      fontSizeSm: '0.875rem',
      fontSizeMd: '1rem',
      fontSizeLg: '1.25rem',
      fontSizeXl: '2.25rem',
      lineHeightBody: '1.55',
      lineHeightHeading: '1.15',
      fontWeightNormal: '400',
      fontWeightMedium: '600',
      fontWeightBold: '700',
    },
    radius: {
      radiusSm: '0',
      radiusMd: '0',
      radiusLg: '0',
      radiusFull: '999px',
    },
    shadow: {
      shadowSm: 'none',
      shadowMd: 'none',
      shadowLg: 'none',
    },
    spacing: {
      spaceXs: '0.25rem',
      spaceSm: '0.5rem',
      spaceMd: '1rem',
      spaceLg: '1.5rem',
      spaceXl: '2.25rem',
      space2xl: '4rem',
      space2xlXs: '2.5rem',
    },
    layout: {
      contentWidth: '72ch',
      wideWidth: '1120px',
      bodyPadding: '1.25rem',
      sectionSpacing: '3rem',
      headerWidth: '1120px',
      footerWidth: '1120px',
      bodyPaddingSm: '1rem',
      bodyPaddingXs: '0.8rem',
      sectionSpacingSm: '2rem',
    },
    scroll: {
      scrollbarWidth: 'auto',
      scrollbarSize: '12px',
      scrollbarTrack: 'var(--color-surface)',
      scrollbarThumb: 'var(--color-border)',
      scrollbarThumbHover: 'var(--color-text-muted)',
      scrollbarRadius: 'var(--radius-full)',
      scrollbarGutter: 'auto',
      scrollBehavior: 'auto',
      scrollPaddingTop: '0',
      overscrollBehavior: 'auto',
    },
  },
  modes: {
    light: {
      colors: {},
    },
    dark: {
      colors: {
        background: '#071009',
        surface: '#0b160d',
        surfaceAlt: '#112017',
        text: '#b9f7c2',
        textMuted: '#75a97e',
        primary: '#74f38a',
        primaryHover: '#a6ffb5',
        primaryText: '#061008',
        border: '#244d2d',
        codeBackground: '#090a0c',
        codeText: '#f5f7fa',
      },
    },
  },
  layers: {
    base: {
      html: {
        colorScheme: 'light dark',
        background: 'var(--color-background)',
      },
      'h1, h2, h3, h4, h5, h6': {
        fontFamily: 'var(--font-heading)',
        fontWeight: 'var(--font-weight-bold)',
        lineHeight: 'var(--line-height-heading)',
        marginBlock: '1.25em 0.5em',
      },
      'p, ul, ol, dl, blockquote, pre, figure, table, form, details': {
        marginBlock: '0 var(--space-lg)',
      },
      'th, td': {
        padding: 'var(--space-sm) var(--space-md)',
        verticalAlign: 'top',
      },
      label: {
        display: 'block',
        marginBlock: 'var(--space-sm)',
      },
      'input:not([type="checkbox"]):not([type="radio"]), textarea, select': {
        width: '100%',
      },
      'input, textarea, select, button': {
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        color: 'var(--color-text)',
        font: 'inherit',
        padding: '0.65rem 0.8rem',
      },
      button: {
        background: 'var(--color-primary)',
        color: 'var(--color-primary-text)',
      },
      'pre code': {
        background: 'transparent',
        color: 'inherit',
        padding: '0',
      },
    },
    elements: {
      body: {
        margin: '0',
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--font-size-base)',
        lineHeight: 'var(--line-height-body)',
      },
      header: {
        maxWidth: 'var(--header-width)',
        marginInline: 'auto',
        padding: 'var(--space-lg) var(--body-padding)',
      },
      nav: {
        display: 'flex',
        gap: 'var(--space-md)',
        alignItems: 'center',
        flexWrap: 'wrap',
      },
      main: {
        maxWidth: 'var(--content-width)',
        marginInline: 'auto',
        padding: 'var(--space-lg) var(--body-padding) var(--space-2xl)',
      },
      section: {
        marginBlock: 'var(--section-spacing)',
      },
      article: {
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '0',
        padding: 'var(--space-lg)',
        boxShadow: 'none',
      },
      aside: {
        borderInlineStart: '4px solid var(--color-primary)',
        backgroundColor: 'var(--color-surface)',
        padding: 'var(--space-md)',
      },
      footer: {
        maxWidth: 'var(--footer-width)',
        marginInline: 'auto',
        padding: 'var(--space-xl) var(--body-padding)',
        color: 'var(--color-text-muted)',
        borderTop: '1px solid var(--color-border)',
      },
      h1: {
        fontSize: '2.1rem',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      },
      h2: {
        fontSize: '1.4rem',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
      },
      h3: {
        fontSize: '1.5rem',
      },
      h4: {
        fontSize: '1.25rem',
      },
      h5: {
        fontSize: '1.05rem',
      },
      h6: {
        fontSize: '0.95rem',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      },
      a: {
        color: 'var(--color-primary)',
        textDecoration: 'none',
      },
      mark: {
        backgroundColor:
          'color-mix(in srgb, var(--color-warning) 25%, transparent)',
        color: 'inherit',
      },
      blockquote: {
        marginInline: '0',
        padding: 'var(--space-md) var(--space-lg)',
        borderInlineStart: '4px solid var(--color-primary)',
        color: 'var(--color-text-muted)',
      },
      hr: {
        border: '0',
        borderTop: '1px solid var(--color-border)',
        marginBlock: 'var(--space-xl)',
      },
      code: {
        fontFamily: 'var(--font-mono)',
        backgroundColor: 'var(--color-surface-alt)',
        borderRadius: 'var(--radius-sm)',
        padding: '0.1em 0.35em',
      },
      pre: {
        backgroundColor: 'var(--color-code-background)',
        color: 'var(--color-code-text)',
        padding: 'var(--space-lg)',
        borderRadius: 'var(--radius-md)',
        overflowX: 'auto',
      },
      kbd: {
        fontFamily: 'var(--font-mono)',
        border: '1px solid var(--color-border)',
        borderBottomWidth: '3px',
        borderRadius: 'var(--radius-sm)',
        padding: '0.12rem 0.4rem',
        backgroundColor: 'var(--color-surface)',
      },
      table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBlock: 'var(--space-lg)',
      },
      th: {
        textAlign: 'left',
        backgroundColor: 'var(--color-surface)',
      },
      td: {
        borderTop: '1px solid var(--color-border)',
      },
      caption: {
        color: 'var(--color-text-muted)',
        marginBottom: 'var(--space-sm)',
        textAlign: 'left',
      },
      fieldset: {
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-lg)',
      },
      input: {
        boxSizing: 'border-box',
      },
      textarea: {
        width: '100%',
        boxSizing: 'border-box',
        minHeight: '7rem',
        resize: 'vertical',
      },
      select: {
        width: '100%',
        boxSizing: 'border-box',
      },
      button: {
        cursor: 'pointer',
        fontWeight: 'var(--font-weight-medium)',
      },
      img: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: 'var(--radius-md)',
      },
      figure: {
        marginInline: '0',
      },
      figcaption: {
        color: 'var(--color-text-muted)',
        fontSize: 'var(--font-size-sm)',
      },
      details: {
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-md)',
      },
      summary: {
        cursor: 'pointer',
        fontWeight: 'var(--font-weight-medium)',
      },
    },
    states: {
      'a:hover': {
        color: 'var(--color-primary-hover)',
      },
      'a:focus-visible': {
        outline:
          '3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)',
        outlineOffset: '3px',
      },
      'button:hover': {
        backgroundColor: 'var(--color-primary-hover)',
      },
      'button:focus-visible': {
        outline:
          '3px solid color-mix(in srgb, var(--color-primary) 45%, transparent)',
        outlineOffset: '3px',
      },
      'button:active': {
        transform: 'translateY(1px)',
      },
      'button:disabled': {
        opacity: '0.55',
        cursor: 'not-allowed',
      },
      'input:focus-visible': {
        outline:
          '3px solid color-mix(in srgb, var(--color-primary) 35%, transparent)',
        borderColor: 'var(--color-primary)',
      },
      'input:disabled': {
        opacity: '0.6',
        cursor: 'not-allowed',
      },
      'input:checked': {
        accentColor: 'var(--color-primary)',
      },
    },
    responsive: {
      tablet: {
        ':root': {
          '--body-padding': 'var(--body-padding-sm)',
          '--section-spacing': 'var(--section-spacing-sm)',
        },
        table: {
          fontSize: 'var(--font-size-sm)',
        },
      },
      mobile: {
        ':root': {
          '--body-padding': 'var(--body-padding-xs)',
          '--space-2xl': 'var(--space-2xl-xs)',
        },
        h1: {
          overflowWrap: 'anywhere',
        },
      },
    },
  },
  breakpoints: {
    mobile: 390,
    tablet: 768,
    desktop: 1440,
  },
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
} as unknown as Theme

export const simpleCssPreset = {
  schemaVersion: 2,
  metadata: {
    name: 'Simple.css',
    description:
      'An editable preset based on Kev Quirk’s Simple.css classless framework.',
    author: 'Kev Quirk / Simple.css contributors',
    version: '1.0.0',
  },
  tokens: {
    colors: {
      background: '#ffffff',
      surface: '#f5f7ff',
      surfaceAlt: '#f5f7ff',
      text: '#212121',
      textMuted: '#585858',
      primary: '#0d47a1',
      primaryHover: '#1266e2',
      primaryText: '#ffffff',
      secondary: '#585858',
      border: '#898ea4',
      success: '#19733c',
      warning: '#ffdd33',
      danger: '#d81b60',
      codeBackground: '#f5f7ff',
      codeText: '#444444',
    },
    typography: {
      fontBody:
        '-apple-system, BlinkMacSystemFont, "Avenir Next", Avenir, "Nimbus Sans L", Roboto, "Noto Sans", "Segoe UI", Arial, Helvetica, "Helvetica Neue", sans-serif',
      fontHeading:
        '-apple-system, BlinkMacSystemFont, "Avenir Next", Avenir, "Nimbus Sans L", Roboto, "Noto Sans", "Segoe UI", Arial, Helvetica, "Helvetica Neue", sans-serif',
      fontMono:
        'Consolas, Menlo, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
      fontSizeBase: '1.15rem',
      fontSizeXs: '0.9rem',
      fontSizeSm: '0.96rem',
      fontSizeMd: '1.15rem',
      fontSizeLg: '1.44rem',
      fontSizeXl: '3rem',
      lineHeightBody: '1.5',
      lineHeightHeading: '1.1',
      fontWeightNormal: '400',
      fontWeightMedium: '600',
      fontWeightBold: '700',
    },
    radius: {
      radiusSm: '5px',
      radiusMd: '5px',
      radiusLg: '5px',
      radiusFull: '999px',
    },
    shadow: {
      shadowSm: 'none',
      shadowMd: 'none',
      shadowLg: 'none',
    },
    spacing: {
      spaceXs: '0.25rem',
      spaceSm: '0.5rem',
      spaceMd: '1rem',
      spaceLg: '1.5rem',
      spaceXl: '2rem',
      space2xl: '4rem',
      space2xlXs: '2.5rem',
    },
    layout: {
      contentWidth: '45rem',
      wideWidth: '1200px',
      bodyPadding: '0.5rem',
      sectionSpacing: '3rem',
      headerWidth: '1200px',
      footerWidth: '45rem',
      bodyPaddingSm: '1rem',
      bodyPaddingXs: '0.8rem',
      sectionSpacingSm: '2rem',
    },
    scroll: {
      scrollbarWidth: 'auto',
      scrollbarSize: '12px',
      scrollbarTrack: 'var(--color-surface)',
      scrollbarThumb: 'var(--color-border)',
      scrollbarThumbHover: 'var(--color-text-muted)',
      scrollbarRadius: 'var(--radius-full)',
      scrollbarGutter: 'auto',
      scrollBehavior: 'auto',
      scrollPaddingTop: '0',
      overscrollBehavior: 'auto',
    },
  },
  modes: {
    light: {
      colors: {},
    },
    dark: {
      colors: {
        background: '#212121',
        surface: '#2b2b2b',
        surfaceAlt: '#111111',
        text: '#dcdcdc',
        textMuted: '#ababab',
        primary: '#ffb300',
        primaryHover: '#ffe099',
        primaryText: '#212121',
        border: '#343a43',
        codeBackground: '#2b2b2b',
        codeText: '#cccccc',
        danger: '#f06292',
      },
    },
  },
  layers: {
    base: {
      html: {
        colorScheme: 'light dark',
        background: 'var(--color-background)',
      },
      'h1, h2, h3, h4, h5, h6': {
        fontFamily: 'var(--font-heading)',
        fontWeight: 'var(--font-weight-bold)',
        lineHeight: 'var(--line-height-heading)',
        marginBlock: '1.25em 0.5em',
      },
      'p, ul, ol, dl, blockquote, pre, figure, table, form, details': {
        marginBlock: '0 var(--space-lg)',
      },
      'th, td': {
        padding: 'var(--space-sm) var(--space-md)',
        verticalAlign: 'top',
      },
      label: {
        display: 'block',
        marginBlock: 'var(--space-sm)',
      },
      'input:not([type="checkbox"]):not([type="radio"]), textarea, select': {
        width: '100%',
      },
      'input, textarea, select, button': {
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        color: 'var(--color-text)',
        font: 'inherit',
        padding: '0.65rem 0.8rem',
      },
      button: {
        background: 'var(--color-primary)',
        color: 'var(--color-primary-text)',
      },
      'pre code': {
        background: 'transparent',
        color: 'inherit',
        padding: '0',
      },
    },
    elements: {
      body: {
        color: 'var(--color-text)',
        backgroundColor: 'var(--color-background)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--font-size-base)',
        lineHeight: 'var(--line-height-body)',
        display: 'grid',
        gridTemplateColumns: '1fr min(45rem, 90%) 1fr',
        margin: '0',
      },
      header: {},
      nav: {},
      main: {
        paddingTop: '1.5rem',
      },
      section: {
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        padding: '2rem 1rem',
        margin: '3rem 0',
      },
      article: {
        border: '1px solid var(--color-border)',
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        marginBottom: '1rem',
        backgroundColor: 'transparent',
        boxShadow: 'none',
      },
      aside: {
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        marginBottom: '1rem',
        fontSize: '1rem',
        width: '30%',
        padding: '0 15px',
        marginInlineStart: '15px',
        float: 'right',
      },
      footer: {},
      h1: {
        fontSize: '3rem',
        lineHeight: '1.1',
        overflowWrap: 'break-word',
      },
      h2: {
        fontSize: '2.6rem',
        marginTop: '3rem',
        lineHeight: '1.1',
        overflowWrap: 'break-word',
      },
      h3: {
        fontSize: '2rem',
        marginTop: '3rem',
        lineHeight: '1.1',
        overflowWrap: 'break-word',
      },
      h4: {
        fontSize: '1.44rem',
        overflowWrap: 'break-word',
      },
      h5: {
        fontSize: '1.15rem',
        overflowWrap: 'break-word',
      },
      h6: {
        fontSize: '0.96rem',
        overflowWrap: 'break-word',
      },
      a: {
        color: 'var(--color-primary)',
      },
      mark: {
        padding: '2px 5px',
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--color-warning)',
        color: 'black',
      },
      blockquote: {
        marginInlineStart: '2rem',
        marginInlineEnd: '0',
        marginBlock: '2rem',
        padding: '0.4rem 0.8rem',
        borderInlineStart: '0.35rem solid var(--color-primary)',
        color: 'var(--color-text-muted)',
        fontStyle: 'italic',
      },
      hr: {
        border: 'none',
        height: '1px',
        background: 'var(--color-border)',
        margin: '1rem auto',
      },
      code: {
        fontFamily: 'var(--font-mono)',
        color: 'var(--color-danger)',
        backgroundColor: 'transparent',
        padding: '0',
      },
      pre: {
        fontFamily: 'var(--font-mono)',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        marginBottom: '1rem',
        padding: '1rem 1.4rem',
        maxWidth: '100%',
        overflow: 'auto',
        color: 'var(--color-code-text)',
      },
      kbd: {
        fontFamily: 'var(--font-mono)',
        color: 'var(--color-code-text)',
        border: '1px solid var(--color-code-text)',
        borderBottom: '3px solid var(--color-code-text)',
        borderRadius: 'var(--radius-md)',
        padding: '0.1rem 0.4rem',
      },
      table: {
        borderCollapse: 'collapse',
        margin: '1.5rem 0',
      },
      th: {
        backgroundColor: 'var(--color-surface)',
        fontWeight: 'bold',
        textAlign: 'start',
        border: '1px solid var(--color-border)',
        padding: '0.5rem',
      },
      td: {
        border: '1px solid var(--color-border)',
        textAlign: 'start',
        padding: '0.5rem',
      },
      caption: {
        fontWeight: 'bold',
        marginBottom: '0.5rem',
        textAlign: 'start',
        color: 'var(--color-text)',
      },
      fieldset: {
        border: '1px solid var(--color-border)',
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        marginBottom: '1rem',
      },
      input: {
        color: 'var(--color-text)',
        backgroundColor: 'var(--color-background)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'none',
        maxWidth: '100%',
        display: 'inline-block',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        padding: '0.5em',
        marginBottom: '0.5rem',
      },
      textarea: {
        color: 'var(--color-text)',
        backgroundColor: 'var(--color-background)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'none',
        maxWidth: '100%',
        width: '100%',
        display: 'inline-block',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        padding: '0.5em',
        marginBottom: '0.5rem',
      },
      select: {
        color: 'var(--color-text)',
        backgroundColor: 'var(--color-background)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'none',
        maxWidth: '100%',
        display: 'inline-block',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        padding: '0.5em',
        marginBottom: '0.5rem',
      },
      button: {
        border: '1px solid var(--color-primary)',
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-primary-text)',
        padding: '0.5rem 0.9rem',
        marginBottom: '0.5rem',
        textDecoration: 'none',
        lineHeight: 'normal',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        boxShadow: 'none',
        maxWidth: '100%',
        display: 'inline-block',
        fontWeight: '400',
      },
      img: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: 'var(--radius-md)',
      },
      figure: {
        margin: '0',
        display: 'block',
        overflowX: 'auto',
      },
      figcaption: {
        position: 'sticky',
        left: '0',
        textAlign: 'center',
        fontSize: '0.9rem',
        color: 'var(--color-text-muted)',
        marginBlock: '1rem',
      },
      details: {
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        marginBottom: '1rem',
        padding: '0.7rem 1rem',
      },
      summary: {
        cursor: 'pointer',
        fontWeight: 'bold',
        padding: '0.7rem 1rem',
        margin: '-0.7rem -1rem',
        wordBreak: 'break-all',
      },
      html: {
        fontFamily: 'var(--font-body)',
        scrollBehavior: 'smooth',
        colorScheme: 'normal',
        background: 'initial',
      },
      'body > *': {
        gridColumn: '2',
      },
      'body > header': {
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        textAlign: 'center',
        padding: '0 0.5rem 2rem 0.5rem',
        gridColumn: '1 / -1',
      },
      'body > header > *:only-child': {
        marginBlockStart: '2rem',
      },
      'body > header h1': {
        maxWidth: '1200px',
        margin: '1rem auto',
      },
      'body > header p': {
        maxWidth: '40rem',
        margin: '1rem auto',
      },
      'body > footer': {
        marginTop: '4rem',
        padding: '2rem 1rem 1.5rem 1rem',
        color: 'var(--color-text-muted)',
        fontSize: '0.9rem',
        textAlign: 'center',
        borderTop: '1px solid var(--color-border)',
      },
      p: {
        margin: '1.5rem 0',
        overflowWrap: 'break-word',
      },
      'header nav': {
        fontSize: '1rem',
        lineHeight: '2',
        padding: '1rem 0 0 0',
      },
      'header nav ul, header nav ol': {
        alignContent: 'space-around',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        listStyleType: 'none',
        margin: '0',
        padding: '0',
      },
      'header nav ul li, header nav ol li': {
        display: 'inline-block',
      },
      'header nav a, header nav a:visited': {
        margin: '0 0.5rem 1rem 0.5rem',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-text)',
        display: 'inline-block',
        padding: '0.1rem 1rem',
        textDecoration: 'none',
      },
      'td, th': {
        border: '1px solid var(--color-border)',
        textAlign: 'start',
        padding: '0.5rem',
      },
      'tr:nth-child(even)': {
        backgroundColor: 'var(--color-surface)',
      },
      dialog: {
        backgroundColor: 'var(--color-background)',
        maxWidth: '40rem',
        margin: 'auto',
        border: '1px solid var(--color-border)',
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
      },
      label: {
        display: 'block',
      },
      abbr: {
        cursor: 'help',
        textDecorationLine: 'underline',
        textDecorationStyle: 'dotted',
      },
      video: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: 'var(--radius-md)',
      },
      cite: {
        fontSize: '0.9rem',
        color: 'var(--color-text-muted)',
        fontStyle: 'normal',
      },
      dt: {
        color: 'var(--color-text-muted)',
      },
      samp: {
        fontFamily: 'var(--font-mono)',
        color: 'var(--color-danger)',
      },
      'pre code': {
        color: 'var(--color-code-text)',
        background: 'none',
        margin: '0',
        padding: '0',
      },
      progress: {
        width: '100%',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        marginBottom: '1rem',
      },
      sup: {
        verticalAlign: 'baseline',
        position: 'relative',
        top: '-0.4em',
      },
      sub: {
        verticalAlign: 'baseline',
        position: 'relative',
        top: '0.3em',
      },
    },
    states: {
      'a:hover': {
        textDecoration: 'none',
      },
      'a:focus-visible': {
        outline: '2px solid var(--color-primary)',
        outlineOffset: '1px',
      },
      'button:hover': {
        backgroundColor: 'var(--color-primary-hover)',
        borderColor: 'var(--color-primary-hover)',
        cursor: 'pointer',
      },
      'button:focus-visible': {
        outline: '2px solid var(--color-primary)',
        outlineOffset: '1px',
      },
      'button:disabled': {
        cursor: 'not-allowed',
        backgroundColor: 'var(--color-surface-alt)',
        borderColor: 'var(--color-surface-alt)',
        color: 'var(--color-text-muted)',
      },
      'input:disabled': {
        cursor: 'not-allowed',
        backgroundColor: 'var(--color-surface-alt)',
        borderColor: 'var(--color-surface-alt)',
        color: 'var(--color-text-muted)',
      },
      'input:checked': {
        backgroundColor: 'var(--color-primary)',
      },
      'textarea:disabled': {
        cursor: 'not-allowed',
        backgroundColor: 'var(--color-surface-alt)',
        borderColor: 'var(--color-surface-alt)',
        color: 'var(--color-text-muted)',
      },
      'select:disabled': {
        cursor: 'not-allowed',
        backgroundColor: 'var(--color-surface-alt)',
        borderColor: 'var(--color-surface-alt)',
        color: 'var(--color-text-muted)',
      },
    },
    responsive: {
      tablet: {
        ':root': {
          '--body-padding': 'var(--body-padding-sm)',
          '--section-spacing': 'var(--section-spacing-sm)',
        },
        table: {
          fontSize: 'var(--font-size-sm)',
        },
      },
      mobile: {
        ':root': {
          '--body-padding': 'var(--body-padding-xs)',
          '--space-2xl': 'var(--space-2xl-xs)',
        },
        h1: {
          overflowWrap: 'anywhere',
        },
      },
    },
  },
  breakpoints: {
    mobile: 720,
    tablet: 720,
    desktop: 1440,
  },
  options: {
    includeMinimalReset: true,
    reducedMotion: true,
  },
} as unknown as Theme

export const presets = {
  Minimal: minimalPreset,
  Editorial: editorialPreset,
  Documentation: documentationPreset,
  Academic: academicPreset,
  Terminal: terminalPreset,
  'Simple.css': simpleCssPreset,
} as const

export type PresetName = keyof typeof presets
