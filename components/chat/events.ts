// Sayfanın herhangi bir yerinden sohbet paneli ve proje detayını açmak için küçük olay köprüsü.

export const CHAT_OPEN = "chat:open";
export const PROJECT_OPEN = "project:open";

export function openChat(question?: string) {
  window.dispatchEvent(new CustomEvent(CHAT_OPEN, { detail: question }));
}

export function openProject(id: string) {
  window.dispatchEvent(new CustomEvent(PROJECT_OPEN, { detail: id }));
}
