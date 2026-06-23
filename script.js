/**
 * 採用LP - script.js
 * ・FAQアコーディオン
 * ・スクロールフェードイン
 * ・スケジュールタブ切り替え
 * ・スムーススクロール
 */

(function () {
  'use strict';

  /* ===================================
     スムーススクロール
     =================================== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      // スマホ時は固定CTAバー分のオフセット
      var stickyBar = document.querySelector('.sticky-cta');
      var offset = (stickyBar && window.innerWidth < 900)
        ? stickyBar.offsetHeight + 8
        : 16;

      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });


  /* ===================================
     FAQアコーディオン
     =================================== */
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq-item__q');
    if (!btn) return;

    btn.addEventListener('click', function () {
      toggleFaq(item);
    });

    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFaq(item);
      }
    });
  });

  function toggleFaq(item) {
    var isOpen = item.classList.contains('open');
    var btn = item.querySelector('.faq-item__q');

    // 他を閉じる
    faqItems.forEach(function (el) {
      if (el !== item) {
        el.classList.remove('open');
        var elBtn = el.querySelector('.faq-item__q');
        if (elBtn) elBtn.setAttribute('aria-expanded', 'false');
      }
    });

    if (isOpen) {
      item.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    } else {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  }


  /* ===================================
     スケジュールタブ切り替え
     =================================== */
  var tabBtns = document.querySelectorAll('.tab-btn');

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tabId = this.getAttribute('data-tab');

      // ボタンのactive切り替え
      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');

      // コンテンツのactive切り替え
      var tabContents = document.querySelectorAll('.tab-content');
      tabContents.forEach(function (c) { c.classList.remove('active'); });

      var target = document.getElementById('tab-' + tabId);
      if (target) {
        target.classList.add('active');
        // フェードイン再適用
        target.querySelectorAll('.fade-in').forEach(function (el) {
          el.classList.add('visible');
        });
      }
    });
  });


  /* ===================================
     スクロールフェードイン (Intersection Observer)
     =================================== */
  var fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -32px 0px'
    });

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }


  /* ===================================
     ページ読み込み時にヒーローを即表示
     =================================== */
  window.addEventListener('DOMContentLoaded', function () {
    // ヒーロー内のfade-in要素を即座に表示
    var heroFades = document.querySelectorAll('.hero .fade-in');
    setTimeout(function () {
      heroFades.forEach(function (el) { el.classList.add('visible'); });
    }, 80);

    // アクティブなタブコンテンツのfade-inも即表示
    var activeTabFades = document.querySelectorAll('.tab-content.active .fade-in');
    activeTabFades.forEach(function (el) { el.classList.add('visible'); });
  });

}());
