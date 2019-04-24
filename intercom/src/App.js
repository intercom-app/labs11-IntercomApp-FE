import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';


class App extends Component {

  componentDidMount = () => {
    this.scrollToTop();
    this.scrollSmooth();
    this.navLinkActive();
  }

  componentDidUpdate = () => {
    this.scrollToTop();
    this.scrollSmooth();
    this.navLinkActive();
  }
  
  scrollToTop = () => {
    window.$(document).ready(function(){
      window.$(this).scrollTop(0);
    });
  }

  scrollSmooth = () => {
    window.$(document).ready(function () {

      window.$('.custom-menu a[href^="#"], .intro-scroller .inner-link').on('click', function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = window.$(target);

        window.$('html, body').stop().animate({
          'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
          window.location.hash = target;
        });
      });

      window.$('a.page-scroll').bind('click', function (event) {
        var $anchor = window.$(this);
        window.$('html, body').stop().animate({
          scrollTop: window.$($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
      });

      window.$(".nav a").on("click", function () {
        window.$(".nav").find(".active").removeClass("active");
        window.$(this).parent().addClass("active");
      });

      window.$('body').append('<div id="toTop" class="btn btn-primary color1"><span class="glyphicon glyphicon-chevron-up"></span></div>');
      window.$(window).scroll(function () {
        if (window.$(this).scrollTop() !== 0) {
          window.$('#toTop').fadeIn();
        } else {
          window.$('#toTop').fadeOut();
        }
      });
      window.$('#toTop').click(function () {
        window.$("html, body").animate({ scrollTop: 0 }, 700);
        return false;
      });

    });

  }

  navLinkActive = () => {
    if (this.props.auth.isAuthenticated()) {
        window.$(".nav a.active").parent().addClass("active");
    }
  }

  login = () => {
    this.props.auth.login();
  }

  logout = () => {
    this.props.auth.logout();
    window.$(document).ready(function(){
      window.$(".nav").find(".active").removeClass("active");
      window.$(".nav a:first").parent().addClass("active");
    });

  }

  render() {

    const id = localStorage.getItem('userId');

    return (
      <>
        <Navigation id={id} login={this.login} logout={this.logout} isAuthenticated={this.props.auth.isAuthenticated} />
      </>
    )
  }
}

export default App;