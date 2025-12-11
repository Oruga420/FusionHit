'use client';

import { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function DownloadButton() {
  const [isBusy, setIsBusy] = useState(false);
  const [message, setMessage] = useState('');

  const handleDownload = async () => {
    try {
      setIsBusy(true);
      setMessage('Capturing snapshot...');
      const target = document.body;

      const canvas = await html2canvas(target, {
        scale: 1.8,
        useCORS: true,
        backgroundColor: '#ffffff',
        scrollY: -window.scrollY,
      });

      const imgData = canvas.toDataURL('image/png', 0.92);
      const pdf = new jsPDF('p', 'pt', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
      const width = canvas.width * ratio;
      const height = canvas.height * ratio;
      const offsetX = (pageWidth - width) / 2;
      const offsetY = 16;

      pdf.addImage(imgData, 'PNG', offsetX, offsetY, width, height, undefined, 'FAST');

      const blob = pdf.output('blob');
      if (blob.size > 2 * 1024 * 1024) {
        setMessage('PDF compressed for size limit.');
      } else {
        setMessage('');
      }
      pdf.save('Alejandro-De-La-Mora.pdf');
    } catch (err) {
      console.error(err);
      setMessage('Could not create PDF. Please try again.');
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <div className="actions">
      <button className="button" onClick={handleDownload} disabled={isBusy}>
        {isBusy ? 'Working...' : 'Download PDF'}
      </button>
      {message ? <span style={{ color: '#0f4f9c', fontWeight: 700 }}>{message}</span> : null}
    </div>
  );
}
