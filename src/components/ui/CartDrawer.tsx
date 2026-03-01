'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Minus, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { CheckoutModal } from './CheckoutModal';

export function CartDrawer() {
    const { items, removeItem, updateQuantity, total, count } = useCart();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [checkoutOpen, setCheckoutOpen] = useState(false);

    return (
        <>
            {/* Floating Cart Button */}
            <AnimatePresence>
                {count > 0 && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setDrawerOpen(true)}
                        className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-[#d4af37] text-black font-[Cinzel] font-black px-5 py-4 rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:bg-white transition-all"
                        aria-label="Open cart"
                    >
                        <ShoppingCart size={20} />
                        <span>{count} event{count > 1 ? 's' : ''}</span>
                        <span className="bg-black text-[#d4af37] text-xs font-black rounded-xl px-2 py-0.5">
                            ₹{total}
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Drawer Backdrop */}
            <AnimatePresence>
                {drawerOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setDrawerOpen(false)}
                            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Drawer Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 250 }}
                            className="fixed right-0 top-0 h-full w-full max-w-md z-50 bg-[#0B0C10] border-l border-[#d4af37]/20 flex flex-col shadow-2xl"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-[#d4af37]/10">
                                <div>
                                    <h2 className="text-xl font-[Cinzel] font-black text-[#d4af37]">Your Quest Log</h2>
                                    <p className="text-stone-500 text-sm">{count} event{count !== 1 ? 's' : ''} selected</p>
                                </div>
                                <button
                                    onClick={() => setDrawerOpen(false)}
                                    className="w-10 h-10 rounded-full border border-[#d4af37]/20 flex items-center justify-center text-stone-400 hover:text-white hover:border-[#d4af37] transition-all"
                                    aria-label="Close cart"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Items */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {items.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-40 text-stone-600">
                                        <ShoppingCart size={40} className="mb-3 opacity-30" />
                                        <p className="font-[Cinzel] italic text-sm">No quests selected</p>
                                    </div>
                                ) : (
                                    items.map(item => (
                                        <div key={item.eventId} className="bg-[#1A1C23] rounded-2xl p-4 flex items-center gap-4">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white font-[Cinzel] font-bold text-sm truncate">{item.eventTitle}</p>
                                                <p className="text-[#d4af37] font-black mt-1">₹{item.pricePerUnit} / person</p>
                                            </div>

                                            {/* Qty controls */}
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.eventId, item.quantity - 1)}
                                                    className="w-7 h-7 rounded-lg border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={12} />
                                                </button>
                                                <span className="text-white font-black w-5 text-center text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.eventId, item.quantity + 1)}
                                                    className="w-7 h-7 rounded-lg border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={12} />
                                                </button>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-white font-black text-sm">₹{item.pricePerUnit * item.quantity}</p>
                                                <button
                                                    onClick={() => removeItem(item.eventId)}
                                                    className="text-red-500/50 hover:text-red-400 transition-colors mt-1"
                                                    aria-label={`Remove ${item.eventTitle}`}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Footer / Checkout */}
                            {items.length > 0 && (
                                <div className="p-6 border-t border-[#d4af37]/10 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-stone-400 font-[Cinzel] font-bold">Total</span>
                                        <span className="text-[#d4af37] font-black text-2xl">₹{total}</span>
                                    </div>
                                    <button
                                        onClick={() => { setDrawerOpen(false); setCheckoutOpen(true); }}
                                        className="w-full bg-[#d4af37] text-black font-[Cinzel] font-black py-4 rounded-2xl hover:bg-white transition-all text-lg tracking-[0.15em] uppercase"
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Checkout Modal */}
            <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
        </>
    );
}
