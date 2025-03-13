"use client";

import { useRef, useEffect, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import { scanReceipt } from "@/actions/transaction";

export function ReceiptScanner({ onScanComplete }) {
  const fileInputRef = useRef(null);
  const [scannedData, setScannedData] = useState(null); // local state for scanned data

  const {
    loading: scanReceiptLoading,
    fn: scanReceiptFn,
    data: fetchedData,
  } = useFetch(scanReceipt);

  // Handle receipt scan
  const handleReceiptScan = async (file) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    await scanReceiptFn(file);
  };

  // When the scan finishes and the data is ready
  useEffect(() => {
    if (fetchedData && !scanReceiptLoading) {
      setScannedData(fetchedData); // store the scanned data in the state
      onScanComplete(fetchedData); // pass data to the parent
      // toast.success("Receipt scanned successfully");
    }
  }, [scanReceiptLoading, fetchedData]);

  // Reset everything when you initiate a new scan
  const initiateNewScan = () => {
    // Clear the input field and scanned data
    fileInputRef.current.value = ""; 
    setScannedData(null); 
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            initiateNewScan(); // reset before scanning a new receipt
            handleReceiptScan(file);
          }
        }}
      />
      <Button
        type="button"
        variant="outline"
        className="w-full h-10 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 animate-gradient hover:opacity-90 transition-opacity text-white hover:text-white"
        onClick={() => {
          initiateNewScan(); // reset before initiating scan
          fileInputRef.current?.click(); // open the file picker
        }}
        disabled={scanReceiptLoading}
      >
        {scanReceiptLoading ? (
          <>
            <Loader2 className="mr-2 animate-spin" />
            <span>Scanning Receipt...</span>
          </>
        ) : (
          <>
            <Camera className="mr-2" />
            <span>Scan Receipt with AI</span>
          </>
        )}
      </Button>
    </div>
  );
}
