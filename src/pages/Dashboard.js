// Import React components
import React, { Component } from "react";

// Import Redux components
import { connect } from "react-redux";
import ACTIONS from "../modules/action";
import Routes from "../route";

// Import Material UI
import {
  InputLabel,
  Input,
  Avatar,
  Card,
  CardActions,
  CardContent,
  Typography,
  FormControlLabel,
  Checkbox,
  withStyles,
  Grid,
  Button,
  FormControl,
  Paper,
  SvgIcon,
  Divider
} from "@material-ui/core";

import { ReactComponent as LogoHashrate } from "./../img/hashrate.svg";
import { ReactComponent as LogoMiners } from "./../img/miners.svg";
import { ReactComponent as LogoBalance } from "./../img/money.svg";

import DashboardCard from "../components/dashboardCard";
import DashboardGraph from "../components/dashboardGraph";
import CircularProgress from "@material-ui/core/CircularProgress";

// Import CSS
import style from "./css.js";

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchDataDashboard();
    this.interval = setInterval(() => this.props.fetchDataDashboard(), 210000); // Update every 3 minutes
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  goToHome() {
    this.props.updateRoute(Routes.HOME);
  }
  render() {
    const { classes } = this.props;
    const dashboardStore = this.props.store;

    if (this.props.store.UI.error !== null) {
      this.goToHome();
    }

    if (!this.props.store.UI.isReady) {
      return (
        <div className={classes.progressDiv}>
          <CircularProgress className={classes.progress} />
        </div>
      );
    }
    return (
      <div className={classes.dashboard}>
        <Grid container spacing={24}>
          <DashboardCard
            logo={LogoHashrate}
            title={"Current Hashrate"}
            content={dashboardStore.data.currentStatistics.currentHashrate}
            xs={12}
            sm={4}
          />
          <DashboardCard
            logo={LogoBalance}
            title={"Unpaid Balance"}
            content={dashboardStore.data.currentStatistics.unpaid}
            xs={12}
            sm={4}
          />
          <DashboardCard
            logo={LogoMiners}
            title={"Active Miners"}
            content={dashboardStore.data.currentStatistics.activeWorkers}
            xs={12}
            sm={4}
          />
          <DashboardGraph data={dashboardStore} title={"Statistics"} xs={12} />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  store: state.dashboard
});

const mapDispatchToProps = dispatch => ({
  fetchDataDashboard: () => dispatch(ACTIONS.fetchDataDashboard()),
  updateRoute: route => dispatch(ACTIONS.updateRoute(route))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(Dashboard));
