// ==UserScript==
// @name         Enhanced Sorter & Channel Manager
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Easy filtering and management for the Sorter tool
// @author       Gemini
// @match        *://argontv.nl/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 1. CSS for the new UI elements
    const style = document.createElement('style');
    style.innerHTML = `
        #custom-manager-bar {
            position: sticky;
            top: 0;
            background: #393E46;
            padding: 15px;
            z-index: 9999;
            border-bottom: 3px solid #00ADB5;
            display: flex;
            gap: 10px;
            align-items: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }
        #quick-filter {
            flex-grow: 1;
            padding: 8px;
            border-radius: 5px;
            border: none;
            background: #222831;
            color: white;
            font-size: 16px;
        }
        .mgmt-btn {
            padding: 8px 15px;
            border-radius: 5px;
            border: none;
            cursor: pointer;
            font-weight: bold;
            transition: opacity 0.2s;
        }
        .mgmt-btn:hover { opacity: 0.8; }
        .btn-green { background: #198754; color: white; }
        .btn-red { background: #dc3545; color: white; }
        .btn-blue { background: #0d6efd; color: white; }

        /* Fix the container to allow sticky header */
        #results { height: auto !important; overflow-y: visible !important; padding-top: 10px; }
        body { overflow-y: auto !important; }
    `;
    document.head.appendChild(style);

    // 2. Create the Management Interface
    function createInterface() {
        const resultsCont = document.querySelector('#results');
        if (!resultsCont) return;

        const managerBar = document.createElement('div');
        managerBar.id = 'custom-manager-bar';

        managerBar.innerHTML = `
            <input type="text" id="quick-filter" placeholder="Search channels (e.g. Sports, UK, Movie)...">
            <button id="bulk-enable" class="mgmt-btn btn-green">Enable Visible</button>
            <button id="bulk-disable" class="mgmt-btn btn-red">Disable Visible</button>
            <button id="save-all" class="mgmt-btn btn-blue">Save & Exit</button>
        `;

        resultsCont.parentNode.insertBefore(managerBar, resultsCont);

        // --- Event Listeners ---

        // Filtering Logic
        document.getElementById('quick-filter').addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            document.querySelectorAll('.result').forEach(el => {
                const name = el.getAttribute('data-catname').toLowerCase();
                el.style.display = name.includes(val) ? 'block' : 'none';
            });
        });

        // Bulk Enable visible
        document.getElementById('bulk-enable').addEventListener('click', () => {
            document.querySelectorAll('.result').forEach(el => {
                if (el.style.display !== 'none') {
                    el.querySelector('.result-enabled').checked = true;
                }
            });
        });

        // Bulk Disable visible
        document.getElementById('bulk-disable').addEventListener('click', () => {
            document.querySelectorAll('.result').forEach(el => {
                if (el.style.display !== 'none') {
                    el.querySelector('.result-enabled').checked = false;
                }
            });
        });

        // Big Save Button
        document.getElementById('save-all').addEventListener('click', () => {
            if (typeof sendPayload === 'function') {
                sendPayload();
                Swal.fire('Saved!', 'Channel configuration updated.', 'success');
            }
        });
    }

    // Initialize when results are loaded
    const observer = new MutationObserver((mutations, obs) => {
        const results = document.querySelectorAll('.result');
        if (results.length > 0) {
            createInterface();
            obs.disconnect();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

})();
