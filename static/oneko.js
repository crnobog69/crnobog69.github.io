// oneko.js: https://github.com/adryd325/oneko.js
// Модификована верзија са функцијом хватања мачке и подршком за додирне екране

(function oneko() {
    const isReducedMotion =
      window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
      window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
  
    if (isReducedMotion) return;
  
    const nekoEl = document.createElement("div");
  
    let nekoPosX = 32;
    let nekoPosY = 32;
  
    let mousePosX = 0;
    let mousePosY = 0;
  
    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation = null;
    let idleAnimationFrame = 0;
  
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
  
    const nekoSpeed = 10;
    const spriteSets = {
      idle: [[-3, -3]],
      alert: [[-7, -3]],
      scratchSelf: [
        [-5, 0],
        [-6, 0],
        [-7, 0],
      ],
      scratchWallN: [
        [0, 0],
        [0, -1],
      ],
      scratchWallS: [
        [-7, -1],
        [-6, -2],
      ],
      scratchWallE: [
        [-2, -2],
        [-2, -3],
      ],
      scratchWallW: [
        [-4, 0],
        [-4, -1],
      ],
      tired: [[-3, -2]],
      sleeping: [
        [-2, 0],
        [-2, -1],
      ],
      N: [
        [-1, -2],
        [-1, -3],
      ],
      NE: [
        [0, -2],
        [0, -3],
      ],
      E: [
        [-3, 0],
        [-3, -1],
      ],
      SE: [
        [-5, -1],
        [-5, -2],
      ],
      S: [
        [-6, -3],
        [-7, -2],
      ],
      SW: [
        [-5, -3],
        [-6, -1],
      ],
      W: [
        [-4, -2],
        [-4, -3],
      ],
      NW: [
        [-1, 0],
        [-1, -1],
      ],
    };
  
    function init() {
      nekoEl.id = "oneko";
      nekoEl.ariaHidden = true;
      nekoEl.style.width = "32px";
      nekoEl.style.height = "32px";
      nekoEl.style.position = "fixed";
      nekoEl.style.pointerEvents = "auto";
      nekoEl.style.imageRendering = "pixelated";
      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
      nekoEl.style.zIndex = Number.MAX_VALUE;
      nekoEl.style.cursor = "grab";
  
      let nekoFile = "./oneko.gif"
      const curScript = document.currentScript
      if (curScript && curScript.dataset.cat) {
        nekoFile = curScript.dataset.cat
      }
      nekoEl.style.backgroundImage = `url(${nekoFile})`;
  
      document.body.appendChild(nekoEl);
  
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("touchmove", onTouchMove, { passive: false });
      nekoEl.addEventListener("mousedown", onMouseDown);
      nekoEl.addEventListener("touchstart", onTouchStart, { passive: false });
      document.addEventListener("mouseup", onMouseUp);
      document.addEventListener("touchend", onTouchEnd);
  
      window.requestAnimationFrame(onAnimationFrame);
    }
  
    function onMouseDown(event) {
      event.preventDefault();
      startDragging(event.clientX, event.clientY);
    }
  
    function onTouchStart(event) {
      event.preventDefault();
      const touch = event.touches[0];
      startDragging(touch.clientX, touch.clientY);
    }
  
    function startDragging(clientX, clientY) {
      isDragging = true;
      offsetX = clientX - nekoPosX;
      offsetY = clientY - nekoPosY;
      nekoEl.style.cursor = "grabbing";
    }
  
    function onMouseUp() {
      stopDragging();
    }
  
    function onTouchEnd() {
      stopDragging();
    }
  
    function stopDragging() {
      isDragging = false;
      nekoEl.style.cursor = "grab";
    }
  
    function onMouseMove(event) {
      event.preventDefault();
      mousePosX = event.clientX;
      mousePosY = event.clientY;
      updatePosition(mousePosX, mousePosY);
    }
  
    function onTouchMove(event) {
      event.preventDefault();
      const touch = event.touches[0];
      mousePosX = touch.clientX;
      mousePosY = touch.clientY;
      updatePosition(mousePosX, mousePosY);
    }
  
    function updatePosition(clientX, clientY) {
      if (isDragging) {
        nekoPosX = clientX - offsetX;
        nekoPosY = clientY - offsetY;
        updateNekoPosition();
      }
    }
  
    function updateNekoPosition() {
      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);
      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
    }
  
    let lastFrameTimestamp;
  
    function onAnimationFrame(timestamp) {
      if (!nekoEl.isConnected) {
        return;
      }
      if (!lastFrameTimestamp) {
        lastFrameTimestamp = timestamp;
      }
      if (timestamp - lastFrameTimestamp > 100) {
        lastFrameTimestamp = timestamp
        frame()
      }
      window.requestAnimationFrame(onAnimationFrame);
    }
  
    function setSprite(name, frame) {
      const sprite = spriteSets[name][frame % spriteSets[name].length];
      nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    }
  
    function resetIdleAnimation() {
      idleAnimation = null;
      idleAnimationFrame = 0;
    }
  
    function idle() {
      idleTime += 1;
  
      if (
        idleTime > 10 &&
        Math.floor(Math.random() * 200) == 0 &&
        idleAnimation == null
      ) {
        let avalibleIdleAnimations = ["sleeping", "scratchSelf"];
        if (nekoPosX < 32) {
          avalibleIdleAnimations.push("scratchWallW");
        }
        if (nekoPosY < 32) {
          avalibleIdleAnimations.push("scratchWallN");
        }
        if (nekoPosX > window.innerWidth - 32) {
          avalibleIdleAnimations.push("scratchWallE");
        }
        if (nekoPosY > window.innerHeight - 32) {
          avalibleIdleAnimations.push("scratchWallS");
        }
        idleAnimation =
          avalibleIdleAnimations[
          Math.floor(Math.random() * avalibleIdleAnimations.length)
          ];
      }
  
      switch (idleAnimation) {
        case "sleeping":
          if (idleAnimationFrame < 8) {
            setSprite("tired", 0);
            break;
          }
          setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
          if (idleAnimationFrame > 192) {
            resetIdleAnimation();
          }
          break;
        case "scratchWallN":
        case "scratchWallS":
        case "scratchWallE":
        case "scratchWallW":
        case "scratchSelf":
          setSprite(idleAnimation, idleAnimationFrame);
          if (idleAnimationFrame > 9) {
            resetIdleAnimation();
          }
          break;
        default:
          setSprite("idle", 0);
          return;
      }
      idleAnimationFrame += 1;
    }
  
    function explodeHearts() {
      const parent = nekoEl.parentElement;
      const rect = nekoEl.getBoundingClientRect();
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const centerX = rect.left + rect.width / 2 + scrollLeft;
      const centerY = rect.top + rect.height / 2 + scrollTop;
  
      for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '❤';
        const offsetX = (Math.random() - 0.5) * 50;
        const offsetY = (Math.random() - 0.5) * 50;
        heart.style.left = `${centerX + offsetX - 16}px`;
        heart.style.top = `${centerY + offsetY - 16}px`;
        heart.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
        parent.appendChild(heart);
  
        setTimeout(() => {
          parent.removeChild(heart);
        }, 1000);
      }
    }
  
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes heartBurst {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(1); opacity: 0; }
      }
      .heart {
        position: absolute;
        font-size: 2em;
        animation: heartBurst 1s ease-out;
        animation-fill-mode: forwards;
        color: #ab9df2;
      }
    `;
  
    document.head.appendChild(style);
    nekoEl.addEventListener('click', explodeHearts);
    nekoEl.addEventListener('touchend', function(e) {
      if (!isDragging) {
        explodeHearts();
      }
    });
  
    function frame() {
      frameCount += 1;
      if (isDragging) {
        setSprite("alert", 0);
        return;
      }
  
      const diffX = nekoPosX - mousePosX;
      const diffY = nekoPosY - mousePosY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);
  
      if (distance < nekoSpeed || distance < 48) {
        idle();
        return;
      }
  
      idleAnimation = null;
      idleAnimationFrame = 0;
  
      if (idleTime > 1) {
        setSprite("alert", 0);
        idleTime = Math.min(idleTime, 7);
        idleTime -= 1;
        return;
      }
  
      let direction;
      direction = diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";
      setSprite(direction, frameCount);
  
      nekoPosX -= (diffX / distance) * nekoSpeed;
      nekoPosY -= (diffY / distance) * nekoSpeed;
  
      updateNekoPosition();
    }
  
    init();
  })();