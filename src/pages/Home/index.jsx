import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import NavBar from "../../components/NavBar";
import Tween, { Circ } from "gsap";
import Contact from "../contact/Contact";
import HomeBlog from "../../scenes/home-blog";
import Footer from "../../components/Footer";

const Home = () => {
  const navigate = useNavigate();

  function contactHandler() {
    document.getElementById("contact").scrollIntoView();
  }

  useEffect(() => {
    // Enhanced code
    (function () {
      var lastTime = 0;
      var vendors = ["ms", "moz", "webkit", "o"];
      for (
        var x = 0;
        x < vendors.length && !window.requestAnimationFrame;
        ++x
      ) {
        window.requestAnimationFrame =
          window[vendors[x] + "RequestAnimationFrame"];
        window.cancelAnimationFrame =
          window[vendors[x] + "CancelAnimationFrame"] ||
          window[vendors[x] + "CancelRequestAnimationFrame"];
      }

      if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = window.setTimeout(function () {
            callback(currTime + timeToCall);
          }, timeToCall);
          lastTime = currTime + timeToCall;
          return id;
        };

      if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
          clearTimeout(id);
        };
    })();

    (function () {
      var width,
        height,
        largeHeader,
        canvas,
        ctx,
        points,
        target,
        animateHeader = true;

      function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = { x: width / 2, y: height / 2 };

        largeHeader = document.getElementById("large-header");

        largeHeader.style.height = height + "px";

        canvas = document.getElementById("x-canvas");
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext("2d");

        // create points
        points = [];
        var puntitos = 20;
        for (var x = 0; x < width; x = x + width / puntitos) {
          for (var y = 0; y < height; y = y + height / puntitos) {
            var px = x + Math.random() * (width / puntitos);
            var py = y + Math.random() * (height / puntitos);
            var p = { x: px, originX: px, y: py, originY: py };
            points.push(p);
          }
        }

        // for each point find the 5 closest points
        for (var i = 0; i < points.length; i++) {
          var closest = [];
          var p1 = points[i];
          for (var j = 0; j < points.length; j++) {
            var p2 = points[j];
            if (!(p1 === p2)) {
              var placed = false;
              for (var k = 0; k < 5; k++) {
                if (!placed) {
                  if (closest[k] === undefined) {
                    closest[k] = p2;
                    placed = true;
                  }
                }
              }

              for (k = 0; k < 5; k++) {
                if (!placed) {
                  if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                    closest[k] = p2;
                    placed = true;
                  }
                }
              }
            }
          }
          p1.closest = closest;
        }

        // assign a circle to each point
        for (i in points) {
          var c = new Circle(
            points[i],
            2 + Math.random() * 2,
            "rgba(255,255,255,0.3)"
          );
          points[i].circle = c;
        }
      }

      // Event handling
      function addListeners() {
        if (!("ontouchstart" in window)) {
          window.addEventListener("mousemove", mouseMove);
        }
        window.addEventListener("scroll", scrollCheck);
        window.addEventListener("resize", resize);
      }

      function mouseMove(e) {
        var posx = 0;
        var posy = 0;
        if (e.pageX || e.pageY) {
          posx = e.pageX;
          posy = e.pageY;
        } else if (e.clientX || e.clientY) {
          posx =
            e.clientX +
            document.body.scrollLeft +
            document.documentElement.scrollLeft;
          posy =
            e.clientY +
            document.body.scrollTop +
            document.documentElement.scrollTop;
        }
        target.x = posx;
        target.y = posy;
      }

      function scrollCheck() {
        if (document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
      }

      function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height + "px";
        canvas.width = width;
        canvas.height = height;
      }

      // animation
      function initAnimation() {
        animate();
        for (var i in points) {
          shiftPoint(points[i]);
        }
      }

      function animate() {
        if (animateHeader) {
          ctx.clearRect(0, 0, width, height);
          for (var i in points) {
            // detect points in range
            if (Math.abs(getDistance(target, points[i])) < 4000) {
              points[i].active = 0.3;
              points[i].circle.active = 0.6;
            } else if (Math.abs(getDistance(target, points[i])) < 20000) {
              points[i].active = 0.1;
              points[i].circle.active = 0.3;
            } else if (Math.abs(getDistance(target, points[i])) < 40000) {
              points[i].active = 0.02;
              points[i].circle.active = 0.1;
            } else {
              points[i].active = 0;
              points[i].circle.active = 0;
            }

            drawLines(points[i]);
            points[i].circle.draw();
          }
        }
        requestAnimationFrame(animate);
      }

      function shiftPoint(p) {
        Tween.to(p, 1 + 1 * Math.random(), {
          x: p.originX - 50 + Math.random() * 100,
          y: p.originY - 50 + Math.random() * 100,
          ease: Circ.easeInOut,
          onComplete: function () {
            shiftPoint(p);
          },
        });
      }

      // Canvas manipulation
      function drawLines(p) {
        if (!p.active) return;
        for (var i in p.closest) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.closest[i].x, p.closest[i].y);
          ctx.strokeStyle = "rgba(255,255,255," + p.active + ")";
          ctx.stroke();
        }
      }

      function Circle(pos, rad, color) {
        var _this = this;

        // constructor
        (function () {
          _this.pos = pos || null;
          _this.radius = rad || null;
          _this.color = color || null;
        })();

        this.draw = function () {
          if (!_this.active) return;
          ctx.beginPath();
          ctx.arc(
            _this.pos.x,
            _this.pos.y,
            _this.radius,
            0,
            2 * Math.PI,
            false
          );
          ctx.fillStyle = "rgba(255,255,255," + _this.active + ")";
          ctx.fill();
        };
      }

      // Util functions
      function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
      }

      // Initialize the header animation
      function initialize() {
        initHeader();
        addListeners();
        initAnimation();
      }

      // Entry point
      initialize();
    })();
  }, []);

  return (
    <div className="fade-in">
      <div id="large-header">
        <canvas id="x-canvas"></canvas>
      </div>
      <NavBar />
      <div className="container">
        <div className="container fade-in-right">
          <div className="Evolve"> Evolve with Innovation </div>
        </div>
        <div className="content_1 fade-in-left">
          <span id="bold">We equip</span> you with
          <span id="bold"> the best in class tech</span> to help run
          <div className="content_2">
            your business<span id="bold"> without hassle</span>.
          </div>
        </div>
        <div className="work-with-us puff-in-center">
          What is it like to
          <span style={{ color: "#b6bce9", marginLeft: "0.8%" }}>
            <svg
              id="wwu-scribble"
              width="350"
              height="9"
              viewBox="0 0 402 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.12592 7.58495C104 1.83258 208.493 0.241111 316.085 1.83225C340.409 2.19196 365.669 2.01914 389.706 4.23441C393.275 4.56334 399.164 4.5648 400.837 6.00194"
                stroke="white"
                strokeWidth="2"
                stroke-linecap="round"
              />
            </svg>
            work with us
          </span>
          <div class="flex-container">
            <p class="centered-paragraph">
              Our team are{" "}
              <span class="highlighted">creative entrepreneurs</span>, each with
              a successful track record of building products in the{" "}
              <span class="highlighted"> fintech space</span>.
            </p>
            <p class="centered-paragraph">
              We want to build awesome products that impact the way people buy{" "}
              <span class="highlighted">financial services</span>.<br /> Not
              only will you be part of a team working within an interesting and
              fast-paced environment,
              <br />
              but also one that focuses on{" "}
              <span class="highlighted">strict quality control</span>.
            </p>
          </div>
          <button className="cta" type="submit" onClick={contactHandler}>
            <span className="hover-underline-animation"> Work WIth US </span>
            <svg
              viewBox="0 0 46 16"
              height="10"
              width="30"
              xmlns="http://www.w3.org/2000/svg"
              id="arrow-horizontal"
              fill="#b6bce9"
            >
              <path
                transform="translate(30)"
                d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                data-name="Path 10"
                id="Path_10"
              ></path>
            </svg>
          </button>
        </div>
        <div className="join-us">
          <span style={{ color: "#b6bce9", marginRight: "20px" }}>
            <svg
              style={{ position: "absolute", marginTop: "5%" }}
              width="100"
              height="7"
              viewBox="0 0 155 7"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.48187 3.90905C41.1936 1.49571 80.4071 1.03427 121.249 2.94584C130.482 3.378 140.077 3.62096 149.179 4.74865C150.531 4.9161 152.767 4.98847 153.385 5.55028"
                stroke="white"
                stroke-width="3"
                stroke-linecap="round"
              />
            </svg>
            Join{" "}
          </span>{" "}
          the Evolution
          <div className="join-us-container">
            <p className="join-us-centered">
              {" "}
              Work hard with highly{" "}
              <span className="highlighted"> motivated team </span>of talented
              people and great <br />
              teammates to launch perfectly crafted products you will love.
            </p>
          </div>
          <button
            className="cta"
            type="submit"
            onClick={() => {
              navigate("/careers");
            }}
          >
            <span className="hover-underline-animation"> Join Us </span>
            <svg
              viewBox="0 0 46 16"
              height="10"
              width="30"
              xmlns="http://www.w3.org/2000/svg"
              id="arrow-horizontal"
              fill="#b6bce9"
            >
              <path
                transform="translate(30)"
                d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                data-name="Path 10"
                id="Path_10"
              ></path>
            </svg>
          </button>
        </div>
        <div className="container">
          <HomeBlog />
        </div>
        <div className="container" id="contact">
          <Contact />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
