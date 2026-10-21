const entryTabs = document.querySelectorAll('.entry-tab');
const entryPanel = document.querySelector('#entry-panel');
const entryHeading = document.querySelector('#entry-heading');
const reservationForm = document.querySelector('#reservation-form');
const eventSlot = document.querySelector('#event-slot');
const attendeeField = document.querySelector('#attendee-count').closest('.form-field');
const attendeeCount = document.querySelector('#attendee-count');
const emailAddress = document.querySelector('#email-address');
const passphraseHelp = document.querySelector('#passphrase-help');
const submitButton = document.querySelector('#reservation-submit');
const demoDialog = document.querySelector('#demo-dialog');
const dialogSummary = document.querySelector('#dialog-summary');

let activeMode = 'new';

entryTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    activeMode = tab.id === 'new-tab' ? 'new' : 'manage';
    entryTabs.forEach((entryTab) => {
      entryTab.setAttribute('aria-selected', String(entryTab === tab));
    });
    entryPanel.setAttribute('aria-labelledby', tab.id);

    const isNewReservation = activeMode === 'new';
    entryHeading.textContent = isNewReservation ? '予約情報' : '予約の確認・キャンセル';
    attendeeField.hidden = !isNewReservation;
    passphraseHelp.textContent = isNewReservation
      ? '6〜64文字。予約確認・キャンセル時に同じものを使います。'
      : '予約時に設定したあいことばを入力してください。';
    submitButton.innerHTML = isNewReservation
      ? '注意事項を確認して予約 <span aria-hidden="true">›</span>'
      : '確認・キャンセル内容を確認 <span aria-hidden="true">›</span>';
  });
});

reservationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const selectedSlot = eventSlot.value || '日時未選択';
  const details = activeMode === 'new'
    ? `${selectedSlot}・${attendeeCount.value}人・${emailAddress.value}`
    : `${selectedSlot}・${emailAddress.value}の予約`;

  dialogSummary.textContent = activeMode === 'new'
    ? `選択内容：${details}`
    : `確認対象：${details}`;
  demoDialog.showModal();
});
