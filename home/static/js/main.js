document.addEventListener('DOMContentLoaded', () => {
  // Загальна функція для додавання подій
  const addEvent = (id, event, handler) => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener(event, handler);
    }
  };

  // NAVBAR
  addEvent('openNavbar', 'click', () => {
    document.getElementById('navbarOverlay').classList.add('active');
    document.body.classList.add('blur-background');
  });

  addEvent('closeNavbar', 'click', () => {
    document.getElementById('navbarOverlay').classList.remove('active');
    document.body.classList.remove('blur-background');
  });

  // CALENDAR
  const initCalendar = () => {
    const { Calendar } = window.VanillaCalendarPro;

    const formatDateString = (dateString) => {
      const date = new Date(dateString);
      return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    };

    const secondCalendarInput = document.getElementById('secondCalendarInput');
    const calendarInputElement = document.getElementById('calendar');

    secondCalendarInput.addEventListener('focus', () => {
      calendarInput.show();
      calendarInput.context.inputElement = secondCalendarInput;
    });

    document.addEventListener('click', (event) => {
      const calendarElement = document.querySelector('.vc');
      if (calendarElement && !calendarElement.contains(event.target) && !secondCalendarInput.contains(event.target) && !calendarInputElement.contains(event.target)) {
        calendarInput.hide();
      }
    });

    const options = {
      inputMode: true,
      positionToInput: 'left',
      selectionDatesMode: 'multiple-ranged',
      onInit(self) {
        const btnEl = self.context.mainElement.querySelector('#btn-close');
        const btnSubmit = self.context.mainElement.querySelector('#btn-submit');

        if (btnEl) btnEl.addEventListener('click', self.hide);
        if (btnSubmit) {
          btnSubmit.addEventListener('click', () => {
            if (self.context.selectedDates[0] && self.context.selectedDates[1]) {
              const formattedStartDate = formatDateString(self.context.selectedDates[0]);
              const formattedEndDate = formatDateString(self.context.selectedDates[1]);

              if (self.context.inputElement === secondCalendarInput) {
                calendarInputElement.value = formattedStartDate;
              }
              self.context.inputElement.value = formattedStartDate;
              secondCalendarInput.value = formattedEndDate;
              self.hide();
            }
          });
        }

        return () => {
          if (btnEl) btnEl.removeEventListener('click', self.hide);
          if (btnSubmit) btnSubmit.removeEventListener('click', self.hide);
        };
      },
      layouts: {
        default: `
          <div class="vc-header" data-vc="header" role="toolbar" aria-label="Calendar Navigation">
            <#ArrowPrev />
            <div class="vc-header__content" data-vc-header="content">
              <#Month />
              <#Year />
            </div>
            <#ArrowNext />
          </div>
          <div class="vc-wrapper" data-vc="wrapper">
            <#WeekNumbers />
            <div class="vc-content" data-vc="content">
              <#Week />
              <#Dates />
              <#DateRangeTooltip />
            </div>
          </div>
          <#ControlTime />
          <button id="btn-submit" type="button">CONFIRM</button>
          <button id="btn-close" type="button">CLOSE</button>
        `,
      }
    };

    const calendarInput = new Calendar('#calendar', options);
    calendarInput.init();
  };

  initCalendar();

  // GUEST
  const initGuestInput = () => {
    const guestInput = document.getElementById('guestInput');
    const inputWindow = document.getElementById('inputWindow');
    const decreaseBtn = document.getElementById('decreaseBtn');
    const increaseBtn = document.getElementById('increaseBtn');
    const okBtn = document.getElementById('okBtn');
    const guestCount = document.getElementById('guestCount');

    let count = 0;

    const updateGuestCount = () => {
      guestCount.textContent = count;
    };

    guestInput.addEventListener('click', () => {
      inputWindow.classList.remove('hidden');
      inputWindow.classList.add('visible');
    });

    decreaseBtn.addEventListener('click', () => {
      if (count > 0) {
        count--;
        updateGuestCount();
      }
    });

    increaseBtn.addEventListener('click', () => {
      count++;
      updateGuestCount();
    });

    okBtn.addEventListener('click', () => {
      guestInput.value = `${count} guest${count !== 1 ? 's' : ''}`;
      inputWindow.classList.remove('visible');
      inputWindow.classList.add('hidden');
    });

    document.addEventListener('click', (event) => {
      if (!inputWindow.contains(event.target) && !guestInput.contains(event.target)) {
        inputWindow.classList.remove('visible');
        inputWindow.classList.add('hidden');
      }
    });
  };

  initGuestInput();

  // LOCATION
  const initLocationInput = () => {
    const locationInput = document.getElementById('locationInput');
    const locationDropdown = document.getElementById('locationDropdown');

    locationInput.addEventListener('click', () => {
      locationDropdown.classList.toggle('visible');
    });

    document.addEventListener('click', (event) => {
      if (!locationDropdown.contains(event.target) && !locationInput.contains(event.target)) {
        locationDropdown.classList.remove('visible');
      }
    });

    locationDropdown.querySelectorAll('.location__dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        locationInput.value = item.textContent;
        locationDropdown.classList.remove('visible');
      });
    });
  };

  initLocationInput();
});