/**
=========================================================
* Virtual Estate - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Niklas Läsche (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Virtual Estate base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";

const { grey } = colors;
const { size } = typography;

const breadcrumbs = {
  styleOverrides: {
    li: {
      lineHeight: 0,
    },

    separator: {
      fontSize: size.sm,
      color: grey[600],
    },
  },
};

export default breadcrumbs;
