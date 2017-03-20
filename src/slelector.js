/**
 * Created by ruslan on 3/20/17.
 */
/**
 * Use: new Selector(el, function)
 * Add watcher
 */
class Selector {
  constructor(el, onSelected) {
    this.elements = el.length ? el : [el];
    this.select = {};
    this.afterSelect = (typeof onSelected === 'function') ? onSelected : console.log;
    this.elements.forEach((item)=>{
      item.addEventListener('mouseup', (e)=>{ this._onSelect(e) })
  })
  }
  _onSelect(e) {
    this.select = Selector.getSelection();
    this.afterSelect(this.select)
  }

  /**
   * Static function
   * Use: Static.getSelection();
   * @returns {{$el: null, text: string, startRange: number, endRange: number}}
   */
  static getSelection() {
    let result = {
      $el: null,
      text: '',
      startRange: 0,
      endRange: 0
    };
    let activeEl = document.activeElement;
    let activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    result.$el = activeEl;
    if (
        (activeElTagName == "textarea") || (activeElTagName == "input" &&
        /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
        (typeof activeEl.selectionStart == "number")
    ) {
      result.startRange = activeEl.selectionStart;
      result.endRange = activeEl.selectionEnd
      result.text = activeEl.value.slice(result.startRange, result.endRange);
    } else if (window.getSelection) {
      result.startRange = activeEl.selectionStart;
      result.endRange = activeEl.selectionEnd
      result.text = window.getSelection().toString();
    }
    return result;
  }
}
