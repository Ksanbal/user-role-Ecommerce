export enum OrderStatus {
  READY = 'READY', // 주문대기
  COMPLETE = 'COMPLETE', // 주문완료
  END = 'END', // 주문 종료(배달완료 또는 픽업완료)
  CANCEL = 'CANCEL', // 취소
}
