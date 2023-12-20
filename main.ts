import { App, Editor, Modal, Notice, Plugin, PluginSettingTab, Setting, addIcon, setIcon } from 'obsidian';

interface MUYUSettings {
	clickgap: string;
}

const DEFAULT_SETTINGS: MUYUSettings = {
	clickgap: '1'
}

export default class MUYU extends Plugin {
	settings: MUYUSettings;
  gongde: number;
  gap: number;

	async onload() {
		await this.loadSettings();
    this.gongde = 0;
    this.gap = 1;
    
    addIcon("muyuIcon", '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="100" height="100" viewBox="0 0 640 640" xml:space="preserve"><desc>Created with Fabric.js 5.3.0</desc><defs></defs><g transform="matrix(-3.4090909091 0 0 1 159.2954545455 320)" id="z8B6Ic9Ey2fYvLU_o7K3V"  ><path style="stroke: rgb(0,0,0); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M 0 0 z" stroke-linecap="round" /></g><g transform="matrix(4.6229253701 -0.1614361112 0.1766940215 5.0598547532 316.1333043771 320.4019768645)" id="yrictsxIWIi7lmntWlNLV"  ><path style="stroke: rgb(158,158,158); stroke-width: 10; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M -63.33346 13.37656 C -55.76986 5.59225 -53.137150000000005 -18.878140000000002 -17.532870000000003 -39.347260000000006 C 18.071399999999997 -59.816370000000006 36.62387 -54.69158 55.12196999999999 -28.517880000000005 C 73.62007 -2.344180000000005 -7.403870000000012 -8.087300000000006 -14.858140000000006 0.10014999999999574 C -18.828740000000007 4.461269999999995 -18.882550000000005 5.448399999999996 -19.163540000000005 7.349219999999995 C -19.410080000000004 9.016939999999995 0.29442999999999486 7.635319999999996 17.959479999999992 1.2461699999999958 C 28.464249999999993 -2.553230000000004 43.23048999999999 -4.269700000000004 49.48736999999999 -6.090950000000004 C 66.26594999999999 -10.974850000000004 65.05868999999998 -4.545270000000004 66.30026999999998 2.6895399999999965 C 67.54185999999999 9.924339999999997 65.67696999999998 43.925489999999996 41.80334999999998 48.190639999999995 C 9.019609999999979 54.04763 14.825829999999982 51.29425 3.906289999999977 51.232479999999995 C -7.689070000000022 51.166889999999995 -18.440520000000024 41.744629999999994 -29.71579000000002 36.57178999999999 C -31.500740000000018 35.75289999999999 -46.46125000000002 28.513079999999995 -55.25747000000002 28.02821999999999 C -64.05368000000001 27.54335999999999 -70.89705000000002 21.16087999999999 -63.33345000000002 13.37656999999999 z" stroke-linecap="round" /></g></svg>')
    addIcon("offclick", '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="100" height="100" viewBox="0 0 640 640" xml:space="preserve"><desc>Created with Fabric.js 5.3.0</desc><defs></defs><g transform="matrix(-3.4090909091 0 0 1 167.0196531925 314.4604508815)" id="z8B6Ic9Ey2fYvLU_o7K3V"  ><path style="stroke: rgb(0,0,0); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M 0 0 z" stroke-linecap="round" /></g><g transform="matrix(3.6609547097 -0.1278433555 0.1399262931 4.0069647693 261.2713804507 400.030121602)" id="yrictsxIWIi7lmntWlNLV"  ><path style="stroke: rgb(158,158,158); stroke-width: 5; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M -63.33346 13.37656 C -55.76986 5.59225 -53.137150000000005 -18.878140000000002 -17.532870000000003 -39.347260000000006 C 18.071399999999997 -59.816370000000006 36.62387 -54.69158 55.12196999999999 -28.517880000000005 C 73.62007 -2.344180000000005 -7.403870000000012 -8.087300000000006 -14.858140000000006 0.10014999999999574 C -18.828740000000007 4.461269999999995 -18.882550000000005 5.448399999999996 -19.163540000000005 7.349219999999995 C -19.410080000000004 9.016939999999995 0.29442999999999486 7.635319999999996 17.959479999999992 1.2461699999999958 C 28.464249999999993 -2.553230000000004 43.23048999999999 -4.269700000000004 49.48736999999999 -6.090950000000004 C 66.26594999999999 -10.974850000000004 65.05868999999998 -4.545270000000004 66.30026999999998 2.6895399999999965 C 67.54185999999999 9.924339999999997 65.67696999999998 43.925489999999996 41.80334999999998 48.190639999999995 C 9.019609999999979 54.04763 14.825829999999982 51.29425 3.906289999999977 51.232479999999995 C -7.689070000000022 51.166889999999995 -18.440520000000024 41.744629999999994 -29.71579000000002 36.57178999999999 C -31.500740000000018 35.75289999999999 -46.46125000000002 28.513079999999995 -55.25747000000002 28.02821999999999 C -64.05368000000001 27.54335999999999 -70.89705000000002 21.16087999999999 -63.33345000000002 13.37656999999999 z" stroke-linecap="round" /></g><g transform="matrix(0.16676824 -0.1124865982 1.7559496468 2.603302409 504.6810366628 195.4271516914)" id="jptKfT-md2zlEKBdGagA3"  ><path style="stroke: rgb(158,158,158); stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(158,158,158); fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M -58.18182 -58.18182 L 58.18181 -58.18182 L 58.18181 58.18181 L -58.18182 58.18181 z" stroke-linecap="round" /></g><g transform="matrix(1.290441085 -0.6293901708 0.6293901708 1.290441085 406.009630967 54.0252351781)" id="1_3vlTe7VHuZULvtbHngn"  ><path style="stroke: rgb(200,200,200); stroke-width: 3; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(158,158,158); fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M 0 -33.93939 C 18.73454 -33.93939 33.93939 -18.734540000000003 33.93939 0 C 33.93939 18.73454 18.734540000000003 33.93939 0 33.93939 C -18.73454 33.93939 -33.93939 18.734540000000003 -33.93939 0 C -33.93939 -18.73454 -18.734540000000003 -33.93939 0 -33.93939 z" stroke-linecap="round" /></g></svg>');
    addIcon("onclick", '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="100" height="100" viewBox="0 0 640 640" xml:space="preserve"><desc>Created with Fabric.js 5.3.0</desc><defs></defs><g transform="matrix(-3.4090909091 0 0 1 167.0196531925 314.4604508815)" id="z8B6Ic9Ey2fYvLU_o7K3V"  ><path style="stroke: rgb(0,0,0); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M 0 0 z" stroke-linecap="round" /></g><g transform="matrix(3.6609547097 -0.1278433555 0.1399262931 4.0069647693 261.2713804507 400.030121602)" id="yrictsxIWIi7lmntWlNLV"  ><path style="stroke: rgb(158,158,158); stroke-width: 5; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M -63.33346 13.37656 C -55.76986 5.59225 -53.137150000000005 -18.878140000000002 -17.532870000000003 -39.347260000000006 C 18.071399999999997 -59.816370000000006 36.62387 -54.69158 55.12196999999999 -28.517880000000005 C 73.62007 -2.344180000000005 -7.403870000000012 -8.087300000000006 -14.858140000000006 0.10014999999999574 C -18.828740000000007 4.461269999999995 -18.882550000000005 5.448399999999996 -19.163540000000005 7.349219999999995 C -19.410080000000004 9.016939999999995 0.29442999999999486 7.635319999999996 17.959479999999992 1.2461699999999958 C 28.464249999999993 -2.553230000000004 43.23048999999999 -4.269700000000004 49.48736999999999 -6.090950000000004 C 66.26594999999999 -10.974850000000004 65.05868999999998 -4.545270000000004 66.30026999999998 2.6895399999999965 C 67.54185999999999 9.924339999999997 65.67696999999998 43.925489999999996 41.80334999999998 48.190639999999995 C 9.019609999999979 54.04763 14.825829999999982 51.29425 3.906289999999977 51.232479999999995 C -7.689070000000022 51.166889999999995 -18.440520000000024 41.744629999999994 -29.71579000000002 36.57178999999999 C -31.500740000000018 35.75289999999999 -46.46125000000002 28.513079999999995 -55.25747000000002 28.02821999999999 C -64.05368000000001 27.54335999999999 -70.89705000000002 21.16087999999999 -63.33345000000002 13.37656999999999 z" stroke-linecap="round" /></g><g transform="matrix(0.0850134011 -0.182311827 2.84594248 1.3270847731 459.2496884716 199.9523389639)" id="jptKfT-md2zlEKBdGagA3"  ><path style="stroke: rgb(158,158,158); stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(158,158,158); fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M -58.18182 -58.18182 L 58.18181 -58.18182 L 58.18181 58.18181 L -58.18182 58.18181 z" stroke-linecap="round" /></g><g transform="matrix(0.7819639996 -1.204118966 1.204118966 0.7819639996 301.8444151253 129.5667707103)" id="1_3vlTe7VHuZULvtbHngn"  ><path style="stroke: rgb(200,200,200); stroke-width: 3; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(158,158,158); fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M 0 -33.93939 C 18.73454 -33.93939 33.93939 -18.734540000000003 33.93939 0 C 33.93939 18.73454 18.734540000000003 33.93939 0 33.93939 C -18.73454 33.93939 -33.93939 18.734540000000003 -33.93939 0 C -33.93939 -18.73454 -18.734540000000003 -33.93939 0 -33.93939 z" stroke-linecap="round" /></g></svg>');
    
    const MUYU = this.addStatusBarItem();
    MUYU.createEl("button", {text: "muyu"});
    setIcon(MUYU, "offclick");

		this.registerDomEvent(MUYU, 'mousedown', (evt: MouseEvent) => {
			setIcon(MUYU, "onclick");
      new Notice("功德 + " + this.gap.toString());
      this.gongde += this.gap;
		});

    this.registerDomEvent(MUYU, 'mouseup', (evt: MouseEvent) => {
      setIcon(MUYU, "offclick");
    });

    this.addRibbonIcon('muyuIcon', '看看功德', () => {
      new Notice("功德数: " + this.gongde.toString());
    });

		// 展示功德
		this.addCommand({
			id: 'show-gongde',
			name: 'Show Gongde',
			callback: () => {
				new GongdeModal(this.app, this.gongde).open();
			}
		});

		// 文中插入
		this.addCommand({
			id: 'insert-gongde',
			name: 'Insert Gongde',
			editorCallback: (editor: Editor) => {
				editor.replaceRange('功德数: ' + this.gongde.toString(), editor.getCursor());
			}
		});

    // 功德归零
    this.addCommand({
      id: 'reset-gongde',
      name: 'Reset Gongde',
      callback: () => {
        this.gongde = 0;
        new Notice("功德数已归零");
      }
    })

		// 设置面板
		this.addSettingTab(new MUYUSetting(this.app, this));
    this.gap = parseInt(this.settings.clickgap);
	}

	onunload() {
    this.saveSettings();
    // this.saveSettings();
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class GongdeModal extends Modal {
  gongde: number;
	constructor(app: App, gonde: number) {
		super(app);
    this.gongde = gonde;
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('功德数：' + this.gongde.toString());
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class MUYUSetting extends PluginSettingTab {
	plugin: MUYU;

	constructor(app: App, plugin: MUYU) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('设置单击增加的功德数')
			.setDesc('默认单击一次增加1点功德')
			.addText(text => text
				.setPlaceholder('1')
				.setValue(this.plugin.settings.clickgap)
				.onChange(async (value) => {
					this.plugin.settings.clickgap = value;
          this.plugin.gap = parseInt(value);
					await this.plugin.saveSettings();
				}));
	}
}

