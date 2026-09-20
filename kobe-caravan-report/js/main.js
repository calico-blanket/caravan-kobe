/* ==================== 01. 写真拡大だけを追加する ====================
 * 本文やカードはHTMLに記載済み。JS無効時もすべて読めます。
 * dialog非対応環境では通常の写真リンクとして動作します。
 */
(() => {
  "use strict";
  const dialog = document.querySelector("#photo-dialog");
  const image = document.querySelector("#dialog-image");
  const caption = document.querySelector("#dialog-caption");
  if (!dialog || typeof dialog.showModal !== "function") return;
  let opener = null;

  /* ==================== 02. 写真を開く ==================== */
  document.querySelectorAll(".photo-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      // Ctrl/Commandクリックなど、ブラウザ標準の別タブ操作は維持する。
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      image.src = link.href;
      image.alt = link.querySelector("img").alt;
      caption.textContent = link.closest("figure").querySelector("figcaption")?.textContent || image.alt;
      dialog.showModal();
      document.body.classList.add("photo-open");
    });
  });

  /* ==================== 03. 閉じる・元の写真へフォーカスを戻す ====================
   * 閉じるボタンとEscはブラウザ標準機能。背景クリックもサポート。
   */
  dialog.addEventListener("click", (event) => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("photo-open");
    image.removeAttribute("src");
    opener?.focus();
  });
})();
