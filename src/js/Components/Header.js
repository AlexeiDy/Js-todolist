import Component from '../helpers/Component';

export default class Header extends Component {
  render() {
    return `<header class="header">
    <div class="header__title">список задач</div>
    </header>
    `.trim();
  }
}
