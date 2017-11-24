import typescript from 'rollup-plugin-typescript2';
const pkg = require('./package.json');

const banner = `/*!
 * ${pkg.name}
 * ${pkg.description}
 * @author ${pkg.author}
 * @license ${pkg.license}
 * @version ${pkg.version}
 */
`;

export default {
  banner,
  entry: 'foo/index.ts',
  dest: 'sweet-scroll.js',
  moduleName: 'SweetScroll',
  format: 'umd',
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
    }),
  ],
};
