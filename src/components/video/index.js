import React, { useRef, useEffect } from "react";

import { Vec2 } from "curtainsjs";
import { Plane } from "react-curtains";
import { vertexShader, fragmentShader } from "shaders/chromatic-aberration";

import "./style.css";

function Video({ src, alt, sensibility = 0.2, damp = 0.2 }) {
  // const [plane, setPlane] = useState(null);

  const ref = useRef();
  const isIn = useRef(false);
  const mouse = useRef(new Vec2());
  const nMouse = useRef(new Vec2());

  const uniforms = {
    time: {
      name: "u_time",
      type: "1f",
      value: 0
    },
    mouse: {
      // our mouse position
      name: "u_mouse",
      type: "2f",
      value: mouse.current
    }
  };

  useEffect(() => {
    const el = ref.current;
    const onMouseMove = e => {
      mouse.current.set(e.clientX, e.clientY);
      isIn.current = true;
    };

    const onTouchMove = e => {
      isIn.current = true;
      mouse.current.set(e.touches[0].clientX, e.touches[0].clientY);
    };

    const deactivateMouse = () => {
      isIn.current = false;
    };

    if (el) {
      el.addEventListener("mousemove", onMouseMove);
      el.addEventListener("touchmove", onTouchMove, { passive: true });
      el.addEventListener("mouseout", deactivateMouse);
      el.addEventListener("touchend", deactivateMouse);
    }

    return () => {
      if (el) {
        el.removeEventListener("mousemove", onMouseMove);
        el.removeEventListener("touchmove", onTouchMove, {
          passive: true
        });
        el.removeEventListener("mouseenter", deactivateMouse);
        el.removeEventListener("mouseout", deactivateMouse);
        el.removeEventListener("touchend", deactivateMouse);
      }
    };
  });

  const onRender = plane => {
    plane.uniforms.time.value++;
    const mouseCoords = plane
      .mouseToPlaneCoords(mouse.current)
      .multiplyScalar(-sensibility);

    let oldX = isIn.current ? mouseCoords.x : 0;
    let oldY = isIn.current ? mouseCoords.y : 0;

    let x = nMouse.current.x + (oldX - nMouse.current.x) * damp;
    let y = nMouse.current.y + (oldY - nMouse.current.y) * damp;

    nMouse.current.set(x, y);

    // update our mouse position uniform
    plane.uniforms.mouse.value = nMouse.current;
  };

  const onReady = plane => {
    plane.playVideos();
  };

  return (
    <div ref={ref} className="video-element-wrapper">
      <Plane
        className="image-element-plane"
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        onRender={onRender}
        onReady={onReady}
      >
        <video className="media" src={src} loop />
      </Plane>
    </div>
  );
}

export default Video;
