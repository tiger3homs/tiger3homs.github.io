// ==UserScript==
// @name         Enhanced Sorter & Channel Manager PRO
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Advanced filtering, selection & bulk management for Sorter
// @author       Gemini
// @match        *://argontv.nl/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    /* -------------------- CSS -------------------- */
    const style = document.createElement('style');
    style.textContent = `
        #custom-manager-bar {
            position: sticky;
            top: 0;
            background: #393E46;
            padding: 12px;
            z-index: 9999;
            border-bottom: 3px solid #00ADB5;
            display: flex;
            gap: 8px;
            align-items: center;
            flex-wrap: wrap;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }
        #quick-filter {
            flex: 1;
            min-width: 220px;
            padding: 8px;
            border-radius: 5px;
            border: none;
            background: #222831;
            color: white;
            font-size: 15px;
        }
        .mgmt-btn {
            padding: 7px 12px;
            border-radius: 5px;
            border: none;
            cursor: pointer;
            font-weight: bold;
            white-space: nowrap;
        }
        .btn-green { background: #198754; color: #fff; }
        .btn-red   { background: #dc3545; color: #fff; }
        .btn-blue  { background: #0d6efd; color: #fff; }
        .btn-gray  { background: #6c757d; color: #fff; }
        .mgmt-btn:hover { opacity: .85; }

        #filter-stats {
            color: #eee;
            font-size: 14px;
            margin-left: auto;
        }

        .result.selected {
            outline: 2px solid #00ADB5;
            background: rgba(0,173,181,0.08);
        }

        body { overflow-y: auto !important; }
    `;
    document.head.appendChild(style);

    /* -------------------- Helpers -------------------- */
    const getResults = () => [...document.querySelectorAll('.result')];
    const isVisible = el => el.style.display !== 'none';

    function updateStats() {
        const total = getResults().length;
        const visible = getResults().filter(isVisible).length;
        document.getElementById('filter-stats').textContent =
            `Visible: ${visible} / ${total}`;
    }

    function clearSelection() {
        getResults().forEach(el => el.classList.remove('selected'));
    }

    /* -------------------- UI -------------------- */
    function createInterface() {
        if (document.getElementById('custom-manager-bar')) return;

        const resultsCont = document.querySelector('#results');
        if (!resultsCont) return;

        const bar = document.createElement('div');
        bar.id = 'custom-manager-bar';
        bar.innerHTML = `
            <input id="quick-filter" placeholder="Filter channels…" />

            <button id="select-visible" class="mgmt-btn btn-gray">Select Visible</button>
            <button id="invert-visible" class="mgmt-btn btn-gray">Invert Selection</button>

            <button id="enable-selected" class="mgmt-btn btn-green">Enable Selected</button>
            <button id="disable-selected" class="mgmt-btn btn-red">Disable Selected</button>

            <button id="clear-filter" class="mgmt-btn btn-gray">Clear</button>
            <button id="save-all" class="mgmt-btn btn-blue">Save</button>

            <span id="filter-stats"></span>
        `;

        resultsCont.parentNode.insertBefore(bar, resultsCont);
        updateStats();

        /* -------------------- Events -------------------- */

        // Filtering
        document.getElementById('quick-filter').addEventListener('input', e => {
            const val = e.target.value.toLowerCase();
            getResults().forEach(el => {
                const name = (el.dataset.catname || '').toLowerCase();
                el.style.display = name.includes(val) ? 'block' : 'none';
            });
            clearSelection();
            updateStats();
        });

        // Click to select result
        resultsCont.addEventListener('click', e => {
            const res = e.target.closest('.result');
            if (!res) return;
            res.classList.toggle('selected');
        });

        // Select visible
        document.getElementById('select-visible').onclick = () => {
            getResults().forEach(el => {
                if (isVisible(el)) el.classList.add('selected');
            });
        };

        // Invert visible selection
        document.getElementById('invert-visible').onclick = () => {
            getResults().forEach(el => {
                if (isVisible(el)) el.classList.toggle('selected');
            });
        };

        // Enable / Disable selected
        function setSelected(state) {
            getResults().forEach(el => {
                if (el.classList.contains('selected')) {
                    const cb = el.querySelector('.result-enabled');
                    if (cb) cb.checked = state;
                }
            });
        }

        document.getElementById('enable-selected').onclick = () => setSelected(true);
        document.getElementById('disable-selected').onclick = () => setSelected(false);

        // Clear filter
        document.getElementById('clear-filter').onclick = () => {
            document.getElementById('quick-filter').value = '';
            getResults().forEach(el => el.style.display = 'block');
            clearSelection();
            updateStats();
        };

        // Save
        document.getElementById('save-all').onclick = () => {
            if (typeof sendPayload === 'function') {
                sendPayload();
                Swal?.fire?.('Saved!', 'Changes applied.', 'success');
            }
        };
    }

    /* -------------------- Init -------------------- */
    const observer = new MutationObserver(() => {
        if (document.querySelectorAll('.result').length) {
            createInterface();
            observer.disconnect();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

})();
