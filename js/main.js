(() => {
  const CELL_WIDTH = 192;
  const CELL_HEIGHT = 208;
  const FRAME_MS = 150;
  const states = [
    { id: "idle", label: "Idle", row: 0, frames: 6 },
    { id: "running-right", label: "Right", row: 1, frames: 8 },
    { id: "running-left", label: "Left", row: 2, frames: 8 },
    { id: "waving", label: "Wave", row: 3, frames: 4 },
    { id: "jumping", label: "Happy", row: 4, frames: 5 },
    { id: "failed", label: "Failed", row: 5, frames: 8 },
    { id: "waiting", label: "Waiting", row: 6, frames: 6 },
    { id: "running", label: "Working", row: 7, frames: 6 },
    { id: "review", label: "Review", row: 8, frames: 6 }
  ];
  const canvas = document.querySelector(".pet-canvas");
  const picker = document.querySelector(".state-picker");
  const context = canvas.getContext("2d");
  const atlas = new Image();
  let selectedState = states[0];
  let frame = 0;
  let lastFrameAt = 0;

  function selectState(state, button) {
    selectedState = state;
    frame = 0;
    picker.querySelectorAll(".state-button").forEach((item) => {
      item.classList.toggle("active", item === button);
    });
  }

  states.forEach((state, index) => {
    const button = document.createElement("button");
    button.className = "state-button";
    button.type = "button";
    button.textContent = state.label;
    button.addEventListener("click", () => selectState(state, button));
    picker.append(button);
    if (index === 0) {
      selectState(state, button);
    }
  });

  function render(time) {
    if (time - lastFrameAt >= FRAME_MS) {
      frame = (frame + 1) % selectedState.frames;
      lastFrameAt = time;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = true;
    context.drawImage(
      atlas,
      frame * CELL_WIDTH,
      selectedState.row * CELL_HEIGHT,
      CELL_WIDTH,
      CELL_HEIGHT,
      0,
      0,
      canvas.width,
      canvas.height
    );
    requestAnimationFrame(render);
  }

  atlas.addEventListener("load", () => requestAnimationFrame(render));
  atlas.src = "./spritesheet.webp";
})();
