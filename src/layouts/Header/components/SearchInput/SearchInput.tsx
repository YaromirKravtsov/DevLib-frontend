import React from 'react'

import styles from './SearchInput.module.css'
import { useHeaderStore } from '../../store/header'

const SearchInput = () => {
  const value = useHeaderStore(store => store.value)
  const setValue = useHeaderStore(store => store.setValue)
  const getData = useHeaderStore(store => store.getData);

  const headerVersion = useHeaderStore(store=> store.headerVersion)


  return (
    <div className={`${styles.main} ${headerVersion == 'small' && styles.small} ` }>
      <input type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder='Пошук...'
      />
      <div className={styles.line}></div>
      <button onClick={getData}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 19L14.66 14.66M17 9C17 10.5823 16.5308 12.129 15.6518 13.4446C14.7727 14.7602 13.5233 15.7855 12.0615 16.391C10.5997 16.9965 8.99113 17.155 7.43928 16.8463C5.88743 16.5376 4.46197 15.7757 3.34315 14.6569C2.22433 13.538 1.4624 12.1126 1.15372 10.5607C0.84504 9.00887 1.00347 7.40034 1.60897 5.93853C2.21447 4.47672 3.23985 3.22729 4.55544 2.34824C5.87103 1.46919 7.41775 1 9 1C11.1217 1 13.1566 1.84285 14.6569 3.34315C16.1571 4.84344 17 6.87827 17 9Z" stroke="#0B7DCF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
  )
}

export default SearchInput
