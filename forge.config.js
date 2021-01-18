const path = require('path');
const fs = require('fs');
const assert = require('assert');
const pkg = require('./package.json');

const icon = path.join(__dirname, './src/assets/img/128x128.png');
assert.ok(fs.existsSync(icon));

const description = 'Send SMS, Text2Speech messages and more via Sms77.io.';

module.exports = {
    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            config: {
                description,
                iconUrl: icon,
                name: pkg.name,
                setupIcon: icon
            },
        },
        {
            name: '@electron-forge/maker-deb',
            config: {
                options: {
                    categories: [
                        'Utility',
                        'Office'
                    ],
                    description,
                    genericName: 'sms77io Desktop Application',
                    homepage: 'https://www.sms77.io/',
                    icon,
                    maintainer: 'André Matthies',
                    name: pkg.name,
                    productDescription: 'Application to send SMS through the sms77io gateway.',
                    productName: 'sms77io Desktop Application',
                    section: 'mail',
                    version: pkg.version
                }
            }
        },
        {
            name: '@electron-forge/maker-dmg',
            config: {
                icon,
                name: pkg.name,
            }
        },
        {
            name: '@electron-forge/maker-rpm',
            config: {
                description,
                icon: icon,
                name: pkg.name,
                version: pkg.version,
            }
        }
    ],
    packagerConfig: {
        appCategoryType: 'public.app-category.social-networking', // MacOSX only
        appCopyright: pkg.author,
        icon, // omit file extension for auto detecting according to OS
    },
    plugins: [
        [
            '@electron-forge/plugin-webpack',
            {
                mainConfig: './webpack.main.config.js',
                renderer: {
                    config: './webpack.renderer.config.js',
                    entryPoints: [
                        {
                            html: './src/index.html',
                            js: './src/renderer.ts',
                            name: 'main_window',
                        },
                    ]
                }
            }
        ]
    ],
    publishers: [
        {
            name: '@electron-forge/publisher-github',
            config: {
                repository: {
                    name: 'desktop',
                    owner: 'sms77io',
                },
                prerelease: true,
            },
        },
    ],
};