import { css } from 'styled-components';

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 1024px) {
      ${props}
    }
  `;
};

// export const SurfaceDuo = (props) => {
//     return css`
//         @media only screen and (max-width: 717px)  {
//             ${props}
//     }
//     `
// }
// export const GalaxyFold = (props) => {
//     return css`
//         @media only screen and (max-width: 360px)  {
//             ${props}
//     }
//     `
// }
